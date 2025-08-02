const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('task-list');

function addDeleteButton(li) {
    if (!li.querySelector('.delete-btn')) {
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.className = 'delete-btn';
        btn.style.marginLeft = '15px';
        btn.onclick = function(e) {
            e.stopPropagation();
            li.remove();
        };
        li.appendChild(btn);
    }
}

function removeDeleteButton(li) {
    const btn = li.querySelector('.delete-btn');
    if (btn) btn.remove();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.marginRight = '10px';

        // Toggle completed state on checkbox change
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed', checkbox.checked);
            removeDeleteButton(li);
        });

        // Double-click to show delete button if completed
        li.addEventListener('dblclick', function() {
            if (li.classList.contains('completed')) {
                addDeleteButton(li);
            }
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        taskList.appendChild(li);
        taskInput.value = "";
    }
});