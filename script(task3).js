// Load tasks from local storage
document.addEventListener("DOMContentLoaded", function() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTaskToList(task);
        });
    }
});

// Add task function
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        addTaskToList(task);
        saveTasks();
        taskInput.value = "";
    }
}

// Add task to the list
function addTaskToList(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.innerText = task.text;
    if (task.completed) {
        li.classList.add("completed");
    }
    li.addEventListener("click", toggleTask);
    taskList.appendChild(li);
}

// Toggle task completion status
function toggleTask() {
    const taskId = this.dataset.id;
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = savedTasks.findIndex(task => task.id === parseInt(taskId));
    savedTasks[taskIndex].completed = !savedTasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    this.classList.toggle("completed");
}

// Save tasks to local storage
function saveTasks() {
    const taskList = document.querySelectorAll("#taskList li");
    const tasks = [];
    taskList.forEach(task => {
        tasks.push({
            id: parseInt(task.dataset.id),
            text: task.innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
