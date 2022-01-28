// patch fontkit
const fs = require("fs");
const original = fs.readFileSync(`node_modules/fontkit/index.js`).toString(`utf-8`);

if (original.indexOf(`// --fontkit-patch-colr-v1`) === -1) {
  const patch = fs.readFileSync(`colr.js`).toString(`utf-8`);;
  const start = original.indexOf(`\nvar COLR = new r.Struct`);
  const end = original.indexOf(`\n});\n`, start);
  const patched = `${original.slice(0,start)}${patch}${original.slice(end)}`;
}