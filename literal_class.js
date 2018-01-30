// Object literal and "this"
var literalCircle = {	// this equals "new Object"
	radius: 10,

	logThis: function() {
		console.log(this);
	},	// "," is needed

	area: function() {
		var increaseRadius = function() {
			this.radius = 20;	// "this" points to window
		};
		increaseRadius();

		// work around this
		self = this;
		var increaseRadius1 = function() {
			self.radius = 20;
		};
		increaseRadius1();
		return Math.PI * this.radius * this.radius;
	}
};

literalCircle.logThis();	// not the window object but literalCircle
console.log(literalCircle.area());