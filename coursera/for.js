console.log("for.js");

var names = ["Yaakov", "John", "Joe"];

var myObj = {
	name: "Yaakov",
	course: "HTML/CSS/JS",
	platform: "Courera"
};

for (var prop in myObj) {
	console.log(prop + ": " + myObj[prop]);
	// myObj.prop is myObj[prop], so myObj.prop is undefined
	// console.log(prop + ": " + myObj.prop);
}

// not "for (var name in names)"
for (var prop in names) {
	console.log(prop + ": " + names[prop]);
}

names[100] = "Bingo";
names.greeting = "Hi!";

for (var prop in names) {
	console.log(prop + ": " + names[prop]);
}
// Output of the above for loop is as follow:
// 0: Yaakov
// 1: John
// 2: Joe
// 100: Bingo
// greeting: Hi!