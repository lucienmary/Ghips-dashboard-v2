const http = require('http');
const app = require('./app');
app.colors = require("colors"); // For console colors/weights/etc.

app.set('port', app.portListener);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + app.portListener;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + app.portListener;

  console.log(app.colors.gray('\n------------------------------------------------------------------------------------------------------------------'));
  console.log(app.colors.red('=================================================================================================================='));
  console.log(app.colors.cyan('   /\\/\\   ________.__    .__               ________                .__   ___.                          .___ /\\/\\ '));
  console.log(app.colors.cyan('   )/)/  /  _____/|  |__ |__|_____  ______ \\______ \\ _____    _____|  |__\\_ |__   _________ _______  __| _/ \\(\\( '));
  console.log(app.colors.cyan('        /   \\  ___|  |  \\|  \\____ \\/  ___/  |    |  \\\\__  \\  /  ___/  |  \\| __ \ /  _ \\__  \\\\_  __ \\/ __ | '));
  console.log(app.colors.cyan('        \\    \\_\\  \\   Y  \\  |  |_> >___ \\   |    `   \\/ __ \\_\\___ \\|   Y  \\ \\_\\ (  <_> ) __ \\|  | \\/ /_/ | '));
  console.log(app.colors.cyan('         \\______  /___|  /__|   __/____  > /_______  (____  /____  >___|  /___  /\\____(____  /__|  \\____ |      '));
  console.log(app.colors.cyan('                \\/     \\/   |__|       \\/          \\/     \\/     \\/     \\/    \\/           \\/           \\/      '));
  console.log(app.colors.red('=================================================================================================================='));
  console.log(app.colors.gray(`---------------------------------------------- ${app.ip.toString()}:${app.portListener.toString()} --------------------------------------------------`));
});

server.listen(app.portListener);
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                             
                                                                                                             
