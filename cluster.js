var cluster = require('cluster');

if (cluster.isMaster) {
    cluster.fork();

    cluster.on("listening", function(worker) {
        console.log("cluster %d conectado", worker.process.pid);
    });

    cluster.on("disconnect", function(worker) {
        console.log("cluster %d desconectado", worker.process.pid);
    });

    cluster.on("exit", function (worker) {
        console.log("cluster %d perdido", worker.process.pid);
        cluster.fork();
    });

} else require('./server.js');