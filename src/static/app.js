const apiUrl = ' https://2cqmj9c9ih.execute-api.us-east-1.amazonaws.com/prod/'; // Replace with your API Gateway URL

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    const response = await fetch(`${apiUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
    });

    const todo = await response.json();
    addTodoToList(todo);
    todoForm.reset();
});

async function fetchTodos() {
    // Note: This is a simplified example. A real-world app would need a "list" endpoint.
    // For now, we'll just fetch items individually after creating them.
}

function addTodoToList(todo) {
    const item = document.createElement('li');
    item.innerHTML = `
        <span>${todo.name}: ${todo.description}</span>
        <button onclick="deleteTodo('${todo.id}')">Delete</button>
    `;
    todoList.appendChild(item);
}

async function deleteTodo(id) {
    await fetch(`${apiUrl}/items/${id}`, { method: 'DELETE' });
    // Note: This is a simplified example. A real-world app would re-fetch the list.
    // For now, we'll just remove the item from the UI.
    document.getElementById(id).remove();
}

fetchTodos();
