const searchUser = document.getElementById("searchUser");
const github = new GitHub();
const ui = new UI();

searchUser.addEventListener("keyup", (event) => {
    const userText = event.target.value;
    if (userText !== "") {
        github
            .getUser(userText)
            .then((response) => {
                ui.showProfile(response.profile);
                ui.showRepos(response.repos);
            })
            .catch((err) => ui.showAlert(err, "alert alert-danger"));
    } else {
        ui.clearProfile();
    }
});
