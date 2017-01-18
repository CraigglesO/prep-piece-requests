"use strict";
const prep_piece_requests_1 = require("./prep-piece-requests");
const ppr = new prep_piece_requests_1.default(962416635, 1048576, 918, 872443);
let x = ppr.prepareRequest(0);
console.log(x);
console.log(x.length);
