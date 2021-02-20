const apiUrl = "http://localhost:3000/"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const error = (err) => {

    console.log("Something went wrong " + err)
}

const postNewTask = async (input) => {

    try {
        
        let data = { description: input, done: false }

        await fetch(apiUrl, {

            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })

    }
    catch (err) {

        error(err)
    }

};

const getTasks = async () => {

    try {

        const res = await fetch(apiUrl, {

            method: "GET",
            headers: myHeaders
        })
            .then(response => response.json())
        return res
    }

    catch (err) {

        error(err)
    }
};

const updateCheckBox = async (id, check) => {

    const raw = JSON.stringify({ "done": check });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {

        await fetch(apiUrl + id, requestOptions)

    }
    catch (err) {

        error(err)
    }
};

const updateTask = async (id, input) => {

    var raw = JSON.stringify({ "description": `${input}` });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {

        await fetch(apiUrl + id, requestOptions)
            .then(response => response.text())

    }
    catch (err) {

        error(err)
    }
};

const deleteTask = async (id) => {

    try {

        const res = await fetch(apiUrl + id, {

            method: "delete"
        })

    }
    catch (err) {

        error(err)
    }
};

