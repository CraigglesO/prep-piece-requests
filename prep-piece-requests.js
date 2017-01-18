"use strict";
const buffer_1 = require("buffer");
const DL_SIZE = 16384;
const REQUEST = buffer_1.Buffer.from([0x00, 0x00, 0x00, 0x0d, 0x06]);
class PPR {
    constructor(length, pieceSize, pieceCount, lastPieceSize) {
        const self = this;
        self.length = length;
        self.pieceSize = pieceSize;
        self.pieceCount = --pieceCount;
        self.lastPieceSize = lastPieceSize;
        self.parts = pieceSize / DL_SIZE;
        self.lastParts = Math.floor(lastPieceSize / DL_SIZE);
        self.leftover = lastPieceSize % DL_SIZE;
    }
    prepareRequest(pieceNumber) {
        const self = this;
        let result = [];
        let count = 0;
        if (pieceNumber !== self.pieceCount) {
            let part = 0;
            count = self.parts;
            for (let i = 0; i < self.parts; i++) {
                let buf = buffer_1.Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00]);
                buf.writeUInt32BE(pieceNumber, 0);
                result.push(REQUEST);
                result.push(buf);
                buf.writeUInt32BE(part, 4);
                part += DL_SIZE;
            }
        }
        else {
            let part = 0;
            count = self.lastParts;
            for (let i = 0; i < self.lastParts; i++) {
                let buf = buffer_1.Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00]);
                buf.writeUInt32BE(pieceNumber, 0);
                result.push(REQUEST);
                result.push(buf);
                buf.writeUInt32BE(part, 4);
                part += DL_SIZE;
            }
            if (self.leftover) {
                let buf = buffer_1.Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00]);
                buf.writeUInt32BE(pieceNumber, 0);
                buf.writeUInt32BE(part, 4);
                buf.writeUInt32BE(self.leftover, 8);
                result.push(REQUEST);
                result.push(buf);
                count++;
            }
        }
        let resultBuf = buffer_1.Buffer.concat(result);
        return { resultBuf, count };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PPR;
