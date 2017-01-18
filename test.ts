import PPR from './prep-piece-requests';

// Total length of torrent: 962416635
// Size of each piece:      1048576
// Number of pieces:        918
// Last piece size:         872443

const ppr = new PPR(962416635, 1048576, 918, 872443);


// First piece:
let x = ppr.prepareRequest(917);

console.log(x.resultBuf);
console.log(x.count);
