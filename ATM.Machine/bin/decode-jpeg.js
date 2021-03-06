const fs = require('fs')
const jpg = require('jpeg-turbo')
const manatee = require('qrCode')

const width = 640
const height = 480
const frame = fs.readFileSync('result.jpg')
const greyscale = jpg.decompressSync(frame, {format: jpg.FORMAT_GRAY}).data
const result = manatee.scanQR(greyscale, width, height)

console.log(greyscale.length)
console.log(greyscale.slice(0, 10))
console.log(result)

