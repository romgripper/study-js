function abc(name, age) {
    // this.name = name;
    // this.age = age;
    console.log(`${name}: ${age}`);
}

const brad = new abc("John", 40);

console.log(brad);
