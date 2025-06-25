const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const dateInput = document.getElementById('task-date');
const timeInput = document.getElementById('task-time');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;

  if (taskText === '' || taskDate === '' || taskTime === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  const dueInfo = document.createElement('div');
  dueInfo.className = 'due-info';
  dueInfo.textContent = `Due: ${taskDate} at ${taskTime}`;
  li.appendChild(dueInfo);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '✔';
  completeBtn.title = 'Mark as complete';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '✖';
  deleteBtn.title = 'Delete task';
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);
  taskList.appendChild(li);

  // Reset form
  input.value = '';
  dateInput.value = '';
  timeInput.value = '';
});
