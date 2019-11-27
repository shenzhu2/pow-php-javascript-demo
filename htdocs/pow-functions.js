// global vars
var counter = 0;
var iterationsSinceLast = 0;
var curTime = new Date().getTime();
var nIntervId;

function get_pow_solution( hostname, timestamp, rand, difficulty ){

	document.getElementById( "output-span" ).innerHTML = "Solving Proof of Work"

	var startString = '';
	for (var i = 0; i < difficulty; i++) {
		startString += '0';
	}

	nIntervId = setInterval( try_pow, 1, hostname, timestamp, rand, startString );

}

function try_pow( hostname, timestamp, rand, startString ){

	hash = Sha256.hash( Sha256.hash( hostname + timestamp + rand + counter ) );
	if( hash.startsWith( startString ) ){
		var output = "Send proof of work solution\n"
		output += "<blockquote>\n"
		output += "hostname = " +hostname+ "<br/>\n"
		output += "timestamp = " +timestamp+ "<br/>\n"
		output += "rand = " +rand+ "<br/>\n"
		output += "counter = " +counter+ "<br/>\n"
		output += "difficulty = " +startString.length+ "<br/>\n"
		output += "hash = " +hash+ "<br/>\n"
		output += "</blockquote>\n"
		document.getElementById( "output-span" ).innerHTML = output;
		submit_pow_solution( hostname, timestamp, rand, startString );
		clearInterval( nIntervId );
	}

	counter++;
	iterationsSinceLast++;

	updateInterval = 4;

	secondsSinceLast = Math.floor( (new Date().getTime() - curTime) / 1000 );
	if( secondsSinceLast > updateInterval ){
		hashPerSec = Math.floor( iterationsSinceLast/updateInterval );
		document.getElementById( "output-span" ).innerHTML = hashPerSec + " hash/sec"

		curTime = new Date().getTime();
		iterationsSinceLast = 0;
	}

}

function submit_pow_solution( hostname, timestamp, rand, startString ){

	difficulty = startString.length;

	// send solution to server web
	httpRequest = new XMLHttpRequest()
	httpRequest.open('POST', '/submit-pow-solution.php')
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.send(
	 'hostname=' +encodeURIComponent(hostname)+ '&' +
	 'timestamp=' +encodeURIComponent(timestamp)+ '&' +
	 'rand=' +encodeURIComponent(rand)+ '&' +
	 'counter=' +encodeURIComponent(counter)+ '&' +
	 'difficulty=' +encodeURIComponent(difficulty)
	);

	httpRequest.onreadystatechange = function(){
		// Process the server response here.
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				pow_solution_accepted()
			} else {
				pow_solution_rejected()
			}
		}
	}
}

function pow_solution_accepted(){

	var output = document.getElementById( "output-span" ).innerHTML
	output += "<p>Server accepted solution!</p>";
	output += '<p>You can now access <a href="/pow-walled-content.php">/pow-walled-content.php</a></p>';
	document.getElementById( "output-span" ).innerHTML = output;

}

function pow_solution_rejected(){

	var output = document.getElementById( "output-span" ).innerHTML
	output += "<p>ERROR Server rejected solution</p>"
	document.getElementById( "output-span" ).innerHTML = output

}
