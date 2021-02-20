let log = console.log

// HTML references
const refs = {

    mainList: document.getElementById("main-list"),
    checkBox: document.getElementsByClassName("check"),
    delete: document.getElementsByClassName("delete-button"),
    submit: document.getElementById("submit"),
    textInput: document.getElementById("input")
};

// Load all task on pageload 
let LoadAllTasks = async () => {

    let res = await getTasks()
        .then(data => {

            log(data)
            data.forEach((item) => {
                createListItem(item.description, item._id)

                // check boxes of checkbox value is true
                if (item.done === true) {

                    let x = document.getElementById(`${item._id}`)
                    x.firstChild.checked = true
                    x.firstChild.nextSibling.classList.add('checked')

                }
            })
        })
    return res
};

LoadAllTasks()

// create list item function
const createListItem = (input, id) => {

    newLi = document.createElement("li")
    newLi.setAttribute("class", "list-item")
    newLi.setAttribute("id", `${id}`)

    NewBox = document.createElement("input")
    NewBox.setAttribute("type", "checkbox")
    NewBox.setAttribute("id", "check")

    newTask = document.createElement("input")
    newTask.setAttribute("type", "text")
    newTask.setAttribute("class", "li-text-field")
    newTask.value = `${input}`

    newDel = document.createElement("button")
    newDel.setAttribute("id", "delete")
    newDel.innerHTML = "delete"

    newLi.appendChild(NewBox)
    newLi.appendChild(newTask)
    newLi.appendChild(newDel)

    refs.mainList.prepend(newLi)
};


document.addEventListener('click', (e) => {

    switch (e.target.id) {

        // Delete task on click event
        case "delete":

            e.target.parentNode.remove()
            deleteTask(e.target.parentNode.id)
            break;

        // adds task on click event
        case "submit":

            const input = refs.textInput.value
            createListItem(input)
            postNewTask(input)
            refs.textInput.value = ""
            break;
    }
});

document.addEventListener('change', (e) => {

    switch (e.srcElement.type) {

        // updates server witch checkbox value and adds style to text
        case "checkbox":

            const taskInput = e.target.nextElementSibling
            const liId = e.target.parentNode.id

            if (e.target.checked === true) {

                taskInput.classList.add('checked')
                updateCheckBox(liId, e.target.checked)
            } else
                taskInput.classList.remove('checked')
            updateCheckBox(liId, e.target.checked)
            break;

        // updates server witch changed task
        case "text":

            if (e.target.id != "taskinput") {

                updateTask(e.target.parentNode.id, e.target.value)
            }
            break;
    }
});









