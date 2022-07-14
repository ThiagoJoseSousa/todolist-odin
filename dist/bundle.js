let dataBank = [];

const getBank = () => JSON.parse(localStorage.getItem('todoList')) ?? []; //if theres something, take It. Or It'll be empty.
const setBank = (dataBank) => localStorage.setItem('todoList', JSON.stringify(dataBank));

const createTask = (title, status, index) => {
    const task = document.createElement('label');
    task.classList.add('todo_item');
    task.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <div> ${title} </div>
    <input type="button" value="X" data-index=${index}>
    `;
    document.getElementById('todoList').appendChild(task);

}
const clearScreen = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    } // while display has a child, remove last child
}

const updateScreen = () => { //the one who changes html
    clearScreen();
    const dataBank = getBank();
    dataBank.forEach((task, index) => createTask(task.title, task.status, index));
}

// dataBank adder
const dataBankAdder = (event) => {
    const keypressed = event.key;
    const text = event.target.value;
    if (keypressed === 'Enter') {
        const dataBank = getBank();
        dataBank.push({ 'title': text, 'status': '' })
        setBank(dataBank);
        updateScreen();
        event.target.value = ''; // cleans the text box
    }
};

const removeItem = (index) => {
    const dataBank = getBank();
    dataBank.splice(index, 1);
    setBank(dataBank)
    updateScreen();

}
const updateItem = (index) => {
    const dataBank = getBank();
    dataBank[index].status = dataBank[index].status === '' ? 'checked' : '';
    setBank(dataBank);
    updateScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', dataBankAdder); //listener to key on input div
document.getElementById('todoList').addEventListener('click', clickItem);

updateScreen();