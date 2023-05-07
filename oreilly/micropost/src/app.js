import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

document.querySelector(".post-submit").addEventListener("click", submitPost);
document.querySelector("#posts").addEventListener("click", postsClicked);
document.querySelector(".card-form").addEventListener("click", cancelEdit);

let POSTS;

function getPosts() {
    http.get("http://localhost:3000/posts")
        .then((posts) => {
            POSTS = posts;
            ui.showPosts(POSTS);
        })
        .catch(console.log);
}

function submitPost() {
    const id = document.querySelector("#id").value;
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;

    if (title === "" || body === "") {
        ui.showAlert("Please fill in all fields", "alert alert-danger");
        return;
    }

    const data = {
        title,
        body
    };

    if (id) {
        http.put(`http://localhost:3000/posts/${id}`, data)
            .then((data) => {
                ui.showAlert("Post updated", "alert alert-success");
                ui.clearFields();
                ui.changeFormState("add");
                getPosts();
            })
            .catch(console.log);
    } else {
        http.post(`http://localhost:3000/posts`, data)
            .then((data) => {
                ui.showAlert("Post added", "alert alert-success");
                ui.clearFields();
                getPosts();
            })
            .catch(console.log);
    }
}

function postsClicked(e) {
    const classList = e.target.parentElement.classList;
    if (classList.contains("edit")) {
        const id = e.target.parentElement.dataset.id;
        const post = POSTS.find((post) => post.id == id);
        ui.fillForm(post);
    } else if (classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;
        http.delete(`http://localhost:3000/posts/${id}`).then(() => {
            ui.showAlert("Post deleted", "alert alert-success");
            getPosts();
        });
    }

    e.preventDefault();
}

function cancelEdit(e) {
    if (e.target.classList.contains("post-cancel")) ui.changeFormState("add");

    e.preventDefault();
}
