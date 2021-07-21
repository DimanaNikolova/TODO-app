$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos)

    $('#todoInput').keypress(function (e) {
        if (e.which == 13) {
            createTodo()
        }
    })
    $(".list").on('click', 'span', function (e) {
        e.stopPropagation()
        removeTodo($(this).parent())
    });
    $(".list").on('click', 'li', function (e) {
        toggleTodo($(this))
    });
})


function addTodos(todos) {
    todos.forEach(todo => {
        addTodo(todo)
    });
}
function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span>' + '</li>')
    newTodo.data('id', todo._id)
    newTodo.data('status', todo.completed)
    if (todo.completed === true) {
        newTodo.addClass('done')
    }
    $('.list').append(newTodo)
}

function createTodo() {
    $.post('/api/todos', {
        name: $('#todoInput').val()
    }).then(function (todo) {
        addTodo(todo)
        $('#todoInput').val('')
    }).catch(function (err) {
        alert('Something went wrong!')
    })
}

function removeTodo(todo) {
    var id = todo.data('id');
    $.ajax({
        method: 'DELETE',
        url: `/api/todos/${id}`
    }).then(function (data) {
        todo.remove()
    }).catch(function(err){
        alert('Something went wrong')
    })
}

function toggleTodo(todo){
    var id = todo.data('id');

    $.ajax({
        method: 'PUT',
        url: `/api/todos/${todo.data('id')}`,
        data: "completed="+!todo.data('status')
    }).then(function (data) {
        console.log(data);
        todo.toggleClass('done')
        todo.data('status', !todo.data('status'))
    }).catch(function(err){
        alert('Something went wrong')
    })
}