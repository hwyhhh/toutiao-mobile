//Recorder
import Recorder from 'recorder-core'
// type
import 'recorder-core/src/engine/pcm.js'
//可选的扩展支持项
import 'recorder-core/src/extensions/wavesurfer.view.js'

export const jsRecorder = (cb) => {
  var testSampleRate = 16000
  var testBitRate = 16
  var SendFrameSize = 1280
  //  去掉console
  Recorder.CLog = () => {}

  //重置环境，每次开始录音时必须先调用此方法，清理环境
  var RealTimeSendTryReset = function () {
    realTimeSendTryChunks = null
  }

  var realTimeSendTryNumber
  var transferUploadNumberMax
  var realTimeSendTryChunk
  var realTimeSendTryChunks

  //=====实时处理核心函数==========
  var RealTimeSendTry = function (buffers, bufferSampleRate, isClose) {
    if (realTimeSendTryChunks == null) {
      realTimeSendTryNumber = 0
      transferUploadNumberMax = 0
      realTimeSendTryChunk = null
      realTimeSendTryChunks = []
    }
    //配置有效性检查
    if (testBitRate == 16 && SendFrameSize % 2 == 1) {
      return
    }

    var pcm = [],
      pcmSampleRate = 0
    if (buffers.length > 0) {
      //借用SampleData函数进行数据的连续处理，采样率转换是顺带的，得到新的pcm数据
      var chunk = Recorder.SampleData(
        buffers,
        bufferSampleRate,
        testSampleRate,
        realTimeSendTryChunk
      )

      //清理已处理完的缓冲数据，释放内存以支持长时间录音，最后完成录音时不能调用stop，因为数据已经被清掉了
      for (
        var i = realTimeSendTryChunk ? realTimeSendTryChunk.index : 0;
        i < chunk.index - 3;
        i++
      ) {
        buffers[i] = null
      }
      realTimeSendTryChunk = chunk //此时的chunk.data就是原始的音频16位pcm数据（小端LE），直接保存即为16位pcm文件、加个wav头即为wav文件、丢给mp3编码器转一下码即为mp3文件

      pcm = chunk.data
      pcmSampleRate = chunk.sampleRate
      if (pcmSampleRate != testSampleRate)
        //除非是onProcess给的bufferSampleRate低于testSampleRate
        throw new Error(
          '不应该出现pcm采样率' + pcmSampleRate + '和需要的采样率' + testSampleRate + '不一致'
        )
    }

    //将pcm数据丢进缓冲，凑够一帧发送，缓冲内的数据可能有多帧，循环切分发送
    if (pcm.length > 0) {
      realTimeSendTryChunks.push({ pcm: pcm, pcmSampleRate: pcmSampleRate })
    }

    //从缓冲中切出一帧数据
    var chunkSize = SendFrameSize / (testBitRate / 8) //8位时需要的采样数和帧大小一致，16位时采样数为帧大小的一半
    pcm = new Int16Array(chunkSize)
    pcmSampleRate = 0
    var pcmOK = false,
      pcmLen = 0
    for1: for (var i1 = 0; i1 < realTimeSendTryChunks.length; i1++) {
      chunk = realTimeSendTryChunks[i1]
      pcmSampleRate = chunk.pcmSampleRate

      for (var i2 = chunk.offset || 0; i2 < chunk.pcm.length; i2++) {
        pcm[pcmLen] = chunk.pcm[i2]
        pcmLen++

        //满一帧了，清除已消费掉的缓冲
        if (pcmLen == chunkSize) {
          pcmOK = true
          chunk.offset = i2 + 1
          for (var i3 = 0; i3 < i1; i3++) {
            realTimeSendTryChunks.splice(0, 1)
          }
          break for1
        }
      }
    }

    //缓冲的数据不够一帧时，不发送 或者 是结束了
    if (!pcmOK) {
      if (isClose) {
        var number = ++realTimeSendTryNumber
        TransferUpload(number, null, 0, null, isClose)
      }
      return
    }

    //16位pcm格式可以不经过mock转码，直接发送new Blob([pcm.buffer],{type:"audio/pcm"}) 但8位的就必须转码，通用起见，均转码处理，pcm转码速度极快
    number = ++realTimeSendTryNumber
    var encStartTime = Date.now()
    var recMock = Recorder({
      type: 'pcm',
      sampleRate: testSampleRate, //需要转换成的采样率
      bitRate: testBitRate, //需要转换成的比特率
    })
    recMock.mock(pcm, pcmSampleRate)
    recMock.stop(
      function (blob, duration) {
        blob.encTime = Date.now() - encStartTime

        //转码好就推入传输
        TransferUpload(number, blob, duration, recMock, false)

        //循环调用，继续切分缓冲中的数据帧，直到不够一帧
        RealTimeSendTry([], 0, isClose)
      },
      function (msg) {
        //转码错误？没想到什么时候会产生错误！
      }
    )
  }

  //=====数据传输函数==========
  var TransferUpload = function (number, blobOrNull, duration, blobRec, isClose) {
    // console.log(number, blobOrNull, duration, blobRec, isClose)
    transferUploadNumberMax = Math.max(transferUploadNumberMax, number)
    if (blobOrNull) {
      var blob = blobOrNull
      var encTime = blob.encTime
      cb(blob, encTime)
    }

    if (isClose) {
      // console.log('isClose')
    }
  }

  //调用录音
  var rec
  var wave
  function recStart() {
    if (rec) {
      rec.close()
    }
    rec = Recorder({
      type: 'unknown',
      onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate) {
        //推入实时处理，因为是unknown格式，buffers和rec.buffers是完全相同的，只需清理buffers就能释放内存。
        RealTimeSendTry(buffers, bufferSampleRate, false)
        //可视化图形绘制
        // wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);
      },
    })

    // var t = setTimeout(function () {
    //   console.log('无法录音：权限请求被忽略（超时假装手动点击了确认对话框）', 1)
    // }, 8000)

    rec.open(function () {
      //打开麦克风授权获得相关资源
      rec.start() //开始录音
      RealTimeSendTryReset() //重置环境，开始录音时必须调用一次

      //此处创建这些音频可视化图形绘制浏览器支持妥妥的
      // wave = Recorder.WaveSurferView({
      //   elem: ".speak-wave",
      //   height: 30 //显示宽度
      //   , scale: 2 //缩放系数，应为正整数，使用2(3? no!)倍宽高进行绘制，避免移动端绘制模糊
      //   , fps: 50 //绘制帧率，不可过高，50-60fps运动性质动画明显会流畅舒适，实际显示帧率达不到这个值也并无太大影响
      //   , duration: 2500 //当前视图窗口内最大绘制的波形的持续时间，此处决定了移动速率
      //   , direction: 1 //波形前进方向，取值：1由左往右，-1由右往左
      //   , position: 0 //绘制位置，取值-1到1，-1为最底下，0为中间，1为最顶上，小数为百分比
      //   , centerHeight: 1 //中线基础粗细，如果为0不绘制中线，position=±1时应当设为0
      //   //波形颜色配置：[位置，css颜色，...] 位置: 取值0.0-1.0之间
      //   , linear: [0, "rgba(0,187,17,1)", 0.7, "rgba(255,215,0,1)", 1, "rgba(255,102,0,1)"]
      //   , centerColor: "" //中线css颜色，留空取波形第一个渐变颜色 });
      // }, function (msg, isUserNotAllow) {
      //   clearTimeout(t);
      //   console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg, 1);
      // });
    })
  }
  // close
  function recStop() {
    rec && rec.close() //直接close掉即可，这个例子不需要获得最终的音频文件
    RealTimeSendTry([], 0, true) //最后一次发送
  }

  return {
    recStart: recStart,
    recStop: recStop,
  }
}
