var Buffer = require('buffer').Buffer;
import * as fs from 'fs';
import TPH from './torrent-piece-handler';

// Total length of torrent: 962416635
// Size of each piece:      1048576
// Number of pieces:        918
// Last piece size:         872443

const files = [ { path: 'Downloads/lol1/1.png',
           name: '1.png',
           length: 255622,
           offset: 0 },
         { path: 'Downloads/lol2/2.png',
           name: '2.png',
           length: 1115627,
           offset: 255622 } ]


//PREP:
// fs.writeFileSync('Downloads/lol1/1.png', new Buffer(255622));
// fs.writeFileSync('Downloads/lol2/2.png', new Buffer(1115627));

let one = fs.readFileSync('./1.png');
// fs.writeFileSync('Downloads/lol1/1.png', one);
// console.log(one.length);
let two = fs.readFileSync('./2.png');
// fs.writeFileSync('Downloads/lol2/2.png', two);
// console.log(two.length);
//
// let xOne = fs.openSync('./1.png', 'r');
// let r = new Buffer(50);
// let one = fs.readSync(xOne, r, 0, 50, 255572);
// r = r.slice(30, 80);
//
// let xTwo = fs.openSync('./2.png', 'r');
// let s = new Buffer(50);
// let two = fs.readSync(xTwo, s, 0, 50, 0);

let r = one.slice(255572);
// console.log('r.length: ', r.length);
let s = two.slice(0, 30);

let result = Buffer.concat([r,s]);

// console.log('r: ', result)
// console.log(result.length);

const tph = new TPH(files, 962416635, 1048576, 918, 872443);

let x = tph.saveBlock(255572, result);
console.log(x);
//
// let x = ppr.savePiece(0, one);
// let y = ppr.savePiece(255622, two);

// console.log(y);


//
//
// // First piece:
// ppr.prepareRequest(917, (buf, count) => {
//   console.log(buf);
//   console.log(count);
// });
//
//
// let y = ppr.pieceIndex(916);
// console.log(y);
//
//
// let x = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]);
//
// let y = x.slice(0,2);
//
// x = x.slice(2);
//
// console.log(x);
// console.log(y);


// fs.writeFileSync('./output.png', one);
//
// let two = one.slice(40,100);
//
// var f = fs.openSync('./output.png', 'r+');
//
// fs.writeSync(f, two, 0, two.length, 40);
