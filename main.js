const os = require("os");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

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

function getRAMInfo() {
  const totalRAM = os.totalmem() / (1024 * 1024 * 1024); // Total RAM dalam GB
  const freeRAM = os.freemem() / (1024 * 1024 * 1024); // RAM tersisa dalam GB
  const usedRAM = totalRAM - freeRAM; // RAM yang digunakan

  console.log(`Total RAM: ${totalRAM.toFixed(2)} GB`);
  console.log(`Free RAM: ${freeRAM.toFixed(2)} GB`);
  console.log(`Used RAM: ${usedRAM.toFixed(2)} GB`);
}

getRAMInfo();

console.log(getRAMInfo);
