const http = new EasyHTTP();

// Get Users
// http.get('https://jsonplaceholder.typicode.com/users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// User Data
const data = {
    name: "John Doe",
    username: "johndoe",
    email: "jdoe@gmail.com",
};
// Create User
http.get("https://jsonplaceholder.typicode.com/users")
    .then(console.log)
    .catch(console.error);
console.log("gettttttttttt");

// Create User
// http.post("https://jsonplaceholder.typicode.com/users", data)
//     .then(console.log)
//     .catch(console.error);

// // Update Post
// http.put("https://jsonplaceholder.typicode.com/users/2", data)
//     .then(console.log)
//     .catch(console.error);

// // Delete User
// http.delete("https://jsonplaceholder.typicode.com/users/2")
//     .then(console.log)
//     .catch(console.error);
