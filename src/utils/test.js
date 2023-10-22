
import { log } from 'console'
import fs from 'fs'

function getFile(fpath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fpath, 'utd8', (err, dataStr) => {
      if (err) return reject(err)
      resolve(dataStr)
    })
  })
}
getFile('./1.txt').then((r1) => { console.log(r1) }, (err) => { console.log(err.message) })
