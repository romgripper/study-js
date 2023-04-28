// Immediately Invoked Function Expressions(IIFEs)
console.log("iife.js");

(function(name) {
	console.log("Hello " + name);
})("Coursera");

(function(window) {
	// greeter1, name, sayHello are using closure
	var greeter1 = {};
	var name = "Bingo";
	greeter1.sayHello = function() {
		console.log("Hello " + name);
	};
	window.greeter1 = greeter1;
})(window);

(function(window) {
	var greeter2 = {};
	var name = "Bin";
	greeter2.sayHi = function() {
		console.log("Hi " + name);
	};
	window.greeter2 = greeter2;
})(window);

greeter1.sayHello();
greeter2.sayHi();