/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 2.0.0
 * @author  Brad Traversy
 * @license MIT
 *
 **/

class EasyHTTP {
    // Make an HTTP GET Request
    async get(url) {
        console.log(`GET ${url}`);
        const res = await fetch(url);
        console.log(`GET ${url} after await 1`);
        const json = await res.json();
        console.log(`GET ${url} after await 2`);
        return json;
    }

    // Make an HTTP POST Request
    async post(url, data) {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    }

    // Make an HTTP PUT Request
    put(url, data) {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }

    // Make an HTTP DELETE Request
    delete(url) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => "Deleted");
    }
}
