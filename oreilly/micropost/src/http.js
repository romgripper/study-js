class EasyHTTP {
    // Make an HTTP GET Request
    async get(url) {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    }

    // Make an HTTP POST Request
    async post(url, data) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    // Make an HTTP PUT Request
    put(url, data) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => res.json());
    }

    // Make an HTTP DELETE Request
    delete(url) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(() => "Deleted");
    }
}

export const http = new EasyHTTP();
