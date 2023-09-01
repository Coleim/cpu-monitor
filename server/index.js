// server/index.js
const express = require("express");
const os = require('os');
const Promise = require('promise');


function getCpuUsagePerCore() {
  return new Promise((resolve, reject) => {
    const cpus = os.cpus();
    const cpuUsagePerCore = [];

    const initialCpuInfo = os.cpus();
    setTimeout(() => {
      const finalCpuInfo = os.cpus();
      for (let i = 0; i < cpus.length; i++) {
        const initialIdle = initialCpuInfo[i].times.idle;
        const finalIdle = finalCpuInfo[i].times.idle;

        const initialTotal = initialCpuInfo[i].times.user + initialCpuInfo[i].times.nice + initialCpuInfo[i].times.sys + initialIdle;
        const finalTotal = finalCpuInfo[i].times.user + finalCpuInfo[i].times.nice + finalCpuInfo[i].times.sys + finalIdle;

        const idleDifference = finalIdle - initialIdle;
        const totalDifference = finalTotal - initialTotal;
        const usage = 100 - Math.floor((100 * idleDifference) / totalDifference);

        cpuUsagePerCore.push({
          id: i,
          model: cpus[i].model,
          usage
        });
      }
      
      resolve(cpuUsagePerCore);
    }, 1000);
  });
}




const PORT = process.env.PORT || 3001;

const app = express();


app.get("/v1/cpu", async (_, res) => {
  
  const cpuUsages = await getCpuUsagePerCore();
  console.log(cpuUsages)
  res.json(cpuUsages);
    // let systemCpuCores = os.cpus();
    // systemCpuCores.forEach( (core, idx) => {
    //   core.id = idx;
    // })
    // res.json(systemCpuCores);
    // console.log(systemCpuCores[1].times.user);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});