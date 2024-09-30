const http = require("http");
const rupiahFormatter = require("rupiah-format");
const fs = require("fs");
const host = "127.0.0.1";
const port = 3000;
const os = require("os");

// request adalah data masuk dari luar
// response adalah data keluar

const server = http.createServer((req, res) => {
  const nama = "Rafly Aziz Abdillah";
  let money = 500000;
  let jajan = 150000;
  let sisa = money - jajan;

  const freeRAM = os.freemem();
  const totalRAM = os.totalmem();
  const usedRAM = totalRAM - freeRAM;

  sisa = rupiahFormatter.convert(sisa);
  money = rupiahFormatter.convert(money);
  jajan = rupiahFormatter.convert(jajan);
  // Perbaikan fs.appendFile (argumen yang benar)
  fs.appendFile("sisauang.txt", sisa, (err) => {
    if (err) {
      console.error("Gagal menyimpan data:", err);
    } else {
      console.log("Data berhasil tersimpan");
    }
  });

  const hasil = `
  <head>
    <title>${nama}</title>
  </head>
  <body>
    <h1 style="text-align: center; background-color: aqua;">Halo, nama saya ${nama}, saya jajan sebanyak ${jajan} dan sisa uang saya sebanyak ${sisa} sisa RAM saya sebanyak ${usedRAM} dari ${totalRAM} dan ram saya adalah ${freeRAM}</h1>
  </body>
  `;

  res.statusCode = 203;

  res.end(hasil);
});

server.listen(port, host, () => {
  console.log(`Server menyala di ${host}:${port}`);
});
