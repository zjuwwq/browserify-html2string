var through = require("through");

var filenamePattern = /\.html$/;

function escape(str){
	return str.replace(/[\\'"\r\n]/g, function(c){
		switch(c){
			case '\\':
				return '\\\\';
			case '"':
				return '\\"';
			case "'":
				return "\\'";
			case '\r':
			case '\n':
				return '';
		}
	});
}

function wrap(str){
	return 'module.exports="' + escape(str) + '"';
}

module.exports = function(file){
	if(!filenamePattern.test(file)) return through();

	var input = '';
	function write(buffer){
		input += buffer;
	}

	function end(){
		this.queue(wrap(input));
		this.queue(null);
	}

	return through(write, end);
};