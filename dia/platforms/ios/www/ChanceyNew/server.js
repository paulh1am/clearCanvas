

// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler); // ****************************************
var url = require('url');
httpServer.listen(80);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
	
	// Read index.html
	
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
  	/*
  	res.writeHead(200);
  	res.end("Life is wonderful");
  	*/
}


// WebSocket Portion

// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function (socket) {

	
		console.log("We have a new client: " + socket.id);

		sendsaves(socket);

		socket.on('sendMessage',function(data) {
            
            console.log("DATA", data);
			var filePath = "diagram.txt" ; // ****************************************
			
			console.log("write file");


			//option to save to one file
			fs.writeFile("DIAGRAMS/"+ data.diagramName + '.txt', JSON.stringify(data), function (err) { /////////******
			  if (err) throw err;
			  console.log('saved!');
			});

		});

		socket.on('disconnect', function() {
				console.log("Client has disconnected " + socket.id);
		});

		socket.on('retrieveData',function(datatosend2) {
            console.log(datatosend2);
            fs.readFile("DIAGRAMS/"+datatosend2, 'utf8', function (err, data) {
			  if (err) throw err;
			  var obj = JSON.parse(data);
			  var dia= JSON.stringify(obj);
			  console.log("dia: " + dia);
			  console.log("obj: " + obj);
			  socket.emit("diaTime",obj);
			});

        });
});


function sendsaves(socket){

	fs.readdir ("DIAGRAMS/", function(err, files){
     
    socket.emit("savedFiles", files); 

	});

}


//////////////////////////////////////////new\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


         
  //     $.getJSON(datatosend2,function(result){
  //     socket.emit(result, result);
  //     console.log("fileName", result);
  //   });

  // });
            //console.log("fileName", fileName);
// 			var filePath = "diagram.txt" ; // ****************************************
			
// 			console.log("write file");


// 			//option to save to one file
// 			fs.writeFile("DIAGRAMS/"+ data.diagramName + '.txt', JSON.stringify(data), function (err) { /////////******
// 			  if (err) throw err;
// 			  console.log('saved!');
// 			});
		
			// socket.on('disconnect', function() {
			// 	console.log("Client has disconnected " + socket.id);
			// });
		
// });





   //          var childProcess = require('child_process');
			// var dataOut;
			
			// //console.log('python run.py '+ data.horatio);

	


		
		
			//    dataOut = childProcess.exec('python freak.py', function (error, stdout, stderr) {
			//    if (error) {
			//      //console.log(error.stack);
			//      //console.log('Error code: '+error.code);
			//      //console.log('Signal received: '+error.signal);
			//    }
			//    //console.log('Child Process STDOUT: '+stdout);
			//    socket.emit('freak',stdout)//****************************************************************************************************************
			//    //console.log('Child Process STDERR: '+stderr);
			//  });

			//  np.on('exit', function (code) {
			//    //console.log('Child process exited with exit code '+code);
			//  });





		



   //          var childProcess = require('child_process');
			// var dataOut;
			
			// //console.log('python run.py '+ data.horatio);

	


		
		
			//    dataOut = childProcess.exec('python freak.py', function (error, stdout, stderr) {
			//    if (error) {
			//      //console.log(error.stack);
			//      //console.log('Error code: '+error.code);
			//      //console.log('Signal received: '+error.signal);
			//    }
			//    //console.log('Child Process STDOUT: '+stdout);
			//    socket.emit('freak',stdout)//****************************************************************************************************************
			//    //console.log('Child Process STDERR: '+stderr);
			//  });

			//  np.on('exit', function (code) {
			//    //console.log('Child process exited with exit code '+code);
			//  });





		
