function newTodo() {
    let text = prompt("New TO DO:");

    if (!text || text.trim() === "") {
        return;
    }

    addTodo(text);
    saveTodos();
}

function addTodo(text) {
    let div = document.createElement("div");
    div.textContent = text;

    div.onclick = function () {
        if (confirm("Do you want to remove this TO DO?")) {
            this.remove();
            saveTodos();
        }
    };

    let list = document.getElementById("ft_list");
    list.insertBefore(div, list.firstChild);
}

function saveTodos() {
    let todos = [];
    let items = document.querySelectorAll("#ft_list div");

    for (let i = 0; i < items.length; i++) {
        todos.push(items[i].textContent);
    }

    document.cookie =
        "todos=" +
        encodeURIComponent(JSON.stringify(todos)) +
        "; max-age=31536000; path=/"; //ถ้าไม่ใส่ max-age / expires → cookie จะหายเมื่อปิด browser
}


function loadTodos() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();

        if (c.startsWith("todos=")) {
            let value = c.substring(6);
            let todos = JSON.parse(decodeURIComponent(value));

            todos.forEach(function (text) {
                addTodo(text);
            });
        }
    }
}

loadTodos();
