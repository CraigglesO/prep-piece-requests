# prep-piece-requests

### Torrents have different pieces sizes. This will manage those differences

Quickly and easily prep for downloads without polluting your code.

Most Bittorent protocols only allow 16kb requests. As such we have to bundle requests if piece sizes are too large.

Features:
* Handles all the parts to each piece
* Last piece size is handled as well
* Gives you the number of parts in the piece request so you can track incoming parts.
* One command is all it takes.

## Install

``` typescript
npm install prep-piece-requests
```

## Usage
``` typescript
import PPR from 'prep-piece-requests';


// Total length of torrent: 962416635
// Size of each piece:      1048576
// Number of pieces:        918
// Last piece size:         872443

const ppr = new PPR(962416635, 1048576, 918, 872443);


// First piece:
let r = ppr.prepareRequest(0);
r.count // -> 64

r.resultBuf
// Prior to concat it looks like this:
// [ <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 00 00 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 00 40 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 00 80 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 00 c0 00 00 00 40 00>,
//  ...
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 0f 40 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 0f 80 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 00 00 00 0f c0 00 00 00 40 00> ]



// Last piece:
let r2 = ppr.prepareRequest(917);
r2.count // -> 54

r2.resultBuf
// Prior to concat it looks like this:
// [ <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 00 00 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 00 40 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 00 80 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 00 c0 00 00 00 40 00>,
// ...
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 0c c0 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 0d 00 00 00 00 40 00>,
// <Buffer 00 00 00 0d 06>,
// <Buffer 00 00 03 95 00 0d 40 00 00 00 0f fb> ]

```

## ISC License (Open Source Initiative)

ISC License (ISC)
Copyright <2017> <Craig OConnor>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
