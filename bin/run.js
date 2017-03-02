'use strict';
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server  = http.createServer(service);

server.listen();

//node_env is used to set the development or production mode, by default its development mode
server.on('listening', function() {
    console.log(`mars alien camera is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/camera/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error Connecting to Mars");
                return;
            }
            console.log(res.body);
        })
    }
    announce();
    setInterval(announce, 15*1000);
});
