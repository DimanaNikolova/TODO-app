$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
})


function addTodos(todos){
    todos.forEach(todo => {
        var newTodo = $('<li class="task">'+todo.name+'</li>')   
        if (todo.completed ===true){
            newTodo.addClass('done')
        }
        $('.list').append(newTodo)
    });
}