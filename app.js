const express = require('express');
const ejs = require('ejs'); // Templating.
const os = require('os'); // To interact with OS.
var favicon = require('serve-favicon');
var fs = require('fs'); // To use/check existence of local files/directories.
const app = express();

app.use("/public", express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// ----------------------------------------------------------------- //
// ------------ local IP recup. ----------------------------------- //
var ip = getLocalIP();

app.ip = ip;
app.portListener = 5000;

function getLocalIP() {
 const interfaces = os.networkInterfaces();
 const addresses = [];

 Object.keys(interfaces).forEach((netInterface) => {
  interfaces[netInterface].forEach((interfaceObject) => {
   if (interfaceObject.family === 'IPv4' && !interfaceObject.internal) {
    addresses.push(interfaceObject.address);
   }
  });
 });
 return addresses;
}

// ----------------------------------------------------------------- //
// ------------ Serial Port. --------------------------------------- //

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

fs.stat("/dev/cu.usbmodem14201", (error, stats) => {
   if (error) {
      console.log('Com. série : ', app.colors.red('Aucun port série détecté'));
   }
   else {
      const portName = '/dev/cu.usbmodem14201';
      const port = new SerialPort(portName, { baudRate: 9600 }); // => /dev/ttyACM0
      const parser = port.pipe(new Readline({ delimiter: '\n' }));
      
      port.on("open", function() {
         console.log('Com. série : ', app.colors.green('Ready!'));
      });
   }
 });

// ----------------------------------------------------------------- //
// ------------- Routes. ------------------------------------------- //

// Dashboard.
app.get('/', function(req, res) {
   res.setHeader('Content-Type', 'text/html');
   res.render('dashboard.ejs', {local_ip: ip, local_port: app.portListener});
});

// Page des logs.
app.get('/logs/', function(req, res) {
   res.setHeader('Content-Type', 'text/html');
   res.render('logs.ejs', {local_ip: ip, local_port: app.portListener});
});

// ---------- Exchange data with client. ---------- //

var allDashboardParameters = {'#led-1': 'cheval'};

console.log(allDashboardParameters);

// Activated by client when a button is pulled.
app.get('/update-server/', function(req, res) {

   for (const [key, value] of Object.entries(req.query)) {
      allDashboardParameters[key] = value;
      console.log(allDashboardParameters);
   }

   res.setHeader('Content-Type', 'text/html').send(req.query);
   res.status(200).end();
});

// URL cron data update. 
app.get('/update-client', function(req, res) {
   res.setHeader('Content-Type', 'text/html').send(allDashboardParameters);
   res.status(200).end();
});

module.exports = app;
