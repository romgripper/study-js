// Arrays
console.log("array.js");

var array = new Array();
array[0] = "Bingo";
array[1] = 2;
array[2] = function (name) {
	console.log("Hello " + name);
};
array[3] = {
	course: "HTML, CSS & JS"	
};

// sparse
array[5] = new Array();

console.log(array);
array[2](array[0]);

// Short hand array creation
var names = [
	"Yaakov", 
	"John", 
	"Joe"
];

names[100] = "Jim";
console.log(names);

for (var i = 0; i < names.length; i++) {
	// The output contains 97 lines of "Hello undefined"
	console.log("Hello " + names[i]);
}