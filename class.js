function Circle(radius) {
	this.radius = radius;
}

// If area() is defined in the class, it will be duplicated in each instance
Circle.prototype.area = function() {
	return Math.PI * Math.pow(this.radius, 2);	// "this" is needed
};

var circle1 = new Circle(10);
console.log(circle1);
console.log(circle1.area());

// If "new" is missing, it is just a function call and the function returns nothing,
// so circle2 gets "undefined"
var circle2 = Circle(10);
console.log(circle2);