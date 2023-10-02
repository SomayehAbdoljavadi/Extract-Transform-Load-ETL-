var chprocess=require('child_process')
function master() {   
var workerprocess=chprocess.exec(`node ${__dirname}/slave.js  test`,function(error,stdout,stderr){
   if (error){
      console.log(error.stack);
      console.log('Error Code: '+error.code);
      console.log('Error signal: '+error.signal);
    }
      console.log(stdout);
     });
     workerprocess.on('exit',function(code) {
       //console.log('Exit Code: '+code);
       console.log("Child Process Exited");
          })
 }
master()