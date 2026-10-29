const STORAGE_KEY = 'academic_planner_tasks';

const defaultTasks = [
  { id: 1, title: 'Complete COS 106 Term Project', completed: false },
  { id: 2, title: 'Submit Web Technologies Assignment', completed: true }
];

let tasks = loadTasks();

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function loadTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (storedTasks) {
    try {
      return JSON.parse(storedTasks);
    } catch (e) {
      console.error('Failed to parse tasks from localStorage:', e);
      return defaultTasks;
    }
  }
  return defaultTasks;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No tasks found. Add one above!</p>';
    return;
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

    taskItem.innerHTML = `
      <span>${escapeHTML(task.title)}</span>
      <div>
        <button onclick="toggleTask(${task.id})" class="btn" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.3rem;">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onclick="deleteTask(${task.id})" class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;">Delete</button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  
  if (text !== '') {
    const newTask = {
      id: Date.now(),
      title: text,
      completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
});

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  
  saveTasks();
  renderTasks();
}

renderTasks();