class GitHub {
    constructor() {
        this.clientId = "Iv1.304c69a8f8f6e5d6";
        this.clientSecret = "e497bb287b721ded0f7c850dda77f34f42d17cdd";
        this.repoCount = 5;
        this.reposSort = "created:asc";
    }

    async getUser(user) {
        const profileResponse = await fetch(
            `https://api.github.com/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );

        if (profileResponse.status !== 200) {
            throw Error(
                `Failed to get user profile of ${user}: user might not exist`
            );
        }

        const repoResponse = await fetch(
            `https://api.github.com/users/${user}/repos?per_page=${this.repoCount}&sort=${this.reposSort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );

        const profile = await profileResponse.json();

        let repos;
        if (repoResponse.status !== 200) {
            console.error(`Failed to get user repos of ${user}`);
            return { profile };
        } else {
            repos = await repoResponse.json();
            return { profile, repos };
        }
    }
}
