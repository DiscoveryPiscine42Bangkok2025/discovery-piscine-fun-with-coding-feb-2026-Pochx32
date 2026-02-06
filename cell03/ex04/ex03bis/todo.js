$(function () {

    $("#new").click(function () {
        var text = prompt("New TO DO:");

        if (!text || text.trim() === "")
            return;

        addTodo(text);
        saveTodos();
    });

    function addTodo(text) {
        var div = $("<div></div>").text(text);

        div.click(function () {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $("#ft_list").prepend(div);
    }

    function saveTodos() {
        var todos = [];

        $("#ft_list div").each(function () {
            todos.push($(this).text());
        });

        document.cookie =
            "todos=" +
            encodeURIComponent(JSON.stringify(todos)) +
            "; max-age=31536000; path=/";
    }

    function loadTodos() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i].trim();

            if (c.startsWith("todos=")) {
                var value = c.substring(6);
                var todos = JSON.parse(decodeURIComponent(value));

                for (var j = 0; j < todos.length; j++) {
                    addTodo(todos[j]);
                }
            }
        }
    }

    loadTodos();
});
