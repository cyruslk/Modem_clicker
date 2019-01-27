const io = require('socket.io')();
const {spawn} = require('child_process');
const child = spawn('minimodem', ["--rx", "100"]);

var arrayOfStrings = [];

child.stdout.on('data', pushIntoArray);
child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


function pushIntoArray(data) {

  if(`${data}` === "�"){
    return;
  }
  arrayOfStrings.push(`${data}`);
  console.log(arrayOfStrings);
}


const port = 5001;
io.listen(port);
console.log('listening on port ', port);
