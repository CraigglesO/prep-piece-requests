import { Buffer } from 'buffer';

interface returnBuffer {
  resultBuf: Buffer
  count:     number
}

const DL_SIZE = 16384; // This is the default allowable download size per request
const REQUEST = Buffer.from([0x00, 0x00, 0x00, 0x0d, 0x06]);

class PPR {
  length:        number
  pieceSize:     number
  pieceCount:    number
  lastPieceSize: number
  parts:         number
  lastParts:     number
  leftover:      number
  constructor(length: number, pieceSize: number, pieceCount: number, lastPieceSize: number) {
    const self = this;
    self.length        = length;
    self.pieceSize     = pieceSize;
    self.pieceCount    = --pieceCount;
    self.lastPieceSize = lastPieceSize;
    self.parts         = pieceSize / DL_SIZE;
    self.lastParts     = Math.floor(lastPieceSize / DL_SIZE);
    self.leftover      = lastPieceSize % DL_SIZE;
  }

  prepareRequest(pieceNumber: number): returnBuffer {
    const self = this;
    let result = [];
    let count  = 0;
    // If not last piece:
    if (pieceNumber !== self.pieceCount) {
      let part = 0;
      count = self.parts;
      for (let i = 0; i < self.parts; i++) {
        let buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00]);
        buf.writeUInt32BE(pieceNumber, 0) // set the piece position
        result.push(REQUEST);
        result.push(buf);
        buf.writeUInt32BE(part,4);        // set the offset inside the piece
        part += DL_SIZE;
      }
    } else {
      let part = 0;
      count = self.lastParts;
      for (let i = 0; i < self.lastParts; i++) {
        let buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00]);
        buf.writeUInt32BE(pieceNumber, 0) // set the piece position
        result.push(REQUEST);
        result.push(buf);
        buf.writeUInt32BE(part,4);        // set the offset inside the piece
        part += DL_SIZE;
      }
      if (self.leftover) {
        let buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00]);
        buf.writeUInt32BE(pieceNumber, 0) // (value,offest)
        buf.writeUInt32BE(part,4);        // set the offset inside the piece
        buf.writeUInt32BE(self.leftover, 8) // The size is smaller
        result.push(REQUEST);
        result.push(buf);
        count++;
      }
    }
    let resultBuf = Buffer.concat(result);
    return { resultBuf, count };
  }
}

export default PPR;
