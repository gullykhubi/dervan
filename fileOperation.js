var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('abc.txt'),
    output: process.stdout,
    console: false
});
var eventname='';
var entry='';
rd.on('line', function(line) {
	var a=line.split(',');
	if(eventname !== a[1]){
		eventname = a[1];
entry+="]";
		entry+=`"${eventname}"\n`;
		entry+="'G':[\n";
	}
	entry+=`{
        "${a[0]}": "${a[3]}",
        "minage": ${a[2].replace('U','')}
      },\n`;
    //console.log('--'+line.split(',')[0]);
});	
rd.on('close',function(){
	
entry+="]";
	//console.log(entry);
	var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});
logger.write(entry)
logger.end() 
})