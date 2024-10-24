const os = require("os");
const disk = require("diskusage");
const path = require("path");
const express = require("express");
const cors = require("cors");
app.use(cors());
const app = express();

// Mendapatkan informasi dasar CPU
const cpuInfo = os.cpus();
console.log("Informasi CPU:", cpuInfo);

// Mendapatkan arsitektur CPU (misalnya x64)
const architecture = os.arch();
console.log("Arsitektur CPU:", architecture);

// Mendapatkan platform (misalnya Linux, Darwin untuk Mac, atau Windows)
const platform = os.platform();
console.log("Platform OS:", platform);

// Mendapatkan waktu sistem berjalan
const uptime = os.uptime();
console.log("Sistem telah berjalan selama:", uptime, "detik");

// Mendapatkan penggunaan memori
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
console.log(`Penggunaan Memori: ${freeMemory} dari ${totalMemory} byte`);

function getCpuUsage() {
  const cpus = os.cpus();

  cpus.forEach((cpu, index) => {
    let total = 0;
    let idle = 0;

    for (let type in cpu.times) {
      total += cpu.times[type];
    }
    idle = cpu.times.idle;

    const usage = ((total - idle) / total) * 100;

    console.log(`CPU ${index}: ${usage.toFixed(2)}% digunakan`);
  });
}

setInterval(getCpuUsage, 10000);

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   setInterval(() => {
//     const totalRAM = os.totalmem() / (1024 * 1024 * 1024); // Total RAM dalam GB
//     const freeRAM = os.freemem() / (1024 * 1024 * 1024); // RAM yang tersisa dalam GB
//     const usedRAM = totalRAM - freeRAM; // RAM yang digunakan

//     const ramData = {
//       total: totalRAM.toFixed(2),
//       free: freeRAM.toFixed(2),
//       used: usedRAM.toFixed(2),
//     };

//     // Kirim data RAM ke client
//     ws.send(JSON.stringify(ramData));
//   }, 1000); // Update setiap 1 detik
// });

// console.log("WebSocket server berjalan di ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected");

  setInterval(() => {
    const diskPath = path.parse(process.cwd()).root; // Mendapatkan path disk
    disk.check(diskPath, (err, info) => {
      if (err) {
        console.error("Error fetching disk usage:", err);
        return;
      }

      const totalDisk = info.total / (1024 * 1024 * 1024); // dalam GB
      const freeDisk = info.free / (1024 * 1024 * 1024); // dalam GB
      const usedDisk = totalDisk - freeDisk; // Disk yang digunakan

      const diskData = {
        total: totalDisk.toFixed(2),
        free: freeDisk.toFixed(2),
        used: usedDisk.toFixed(2),
      };

      // Kirim data disk ke client
      ws.send(JSON.stringify(diskData));
    });
  }, 1000); // Update setiap 1 detik
});

console.log("WebSocket server berjalan di ws://localhost:8080");
