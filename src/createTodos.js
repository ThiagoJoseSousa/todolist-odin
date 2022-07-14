//everything that todos have will go here

let dataBank = [
    {'title':'study JS', 'status':''},
    {'title':'motivated', 'status':'checked'}
]

const createTask = (title,status,index) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML= `
    <input type="checkbox" ${status} data-index=${index}>
    <div> ${title} </div>
    <input type="button" value="X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item);

}
const clearScreen = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) { 
        todoList.removeChild(todoList.lastChild)
    } // while display has a child, remove last child
}

const updateScreen = () => { //the one who changes html
    clearScreen();
    dataBank.forEach((task, index) => createTask(task.title, task.status, index));
}

// dataBank adder
const dataBankAdder= (event) => {
    const keypressed= event.key;
    const text = event.target.value;
    if (keypressed === 'Enter'){
        dataBank.push({'title':text, 'status':''})
        updateScreen();
        event.target.value= ''; // cleans the text box
    }
};

const removeItem=(index) => {
    dataBank.slice(index, 1);
    updateScreen();
    
}
const updateItem= (index) => {
    dataBank[index].status= dataBank[index].status=== ''? 'checked':'';
}

const clickItem = (event) => {
const element = event.target;
if (element.type==='button') {
    const index = element.dataset.index;
    removeItem(index);
} else if (element.type==='checkbox') {
    const index=element.dataset.index;
    updateItem(index);
}
}

document.getElementById('new-Item').addEventListener('keypress',dataBankAdder); //listener to key on input div
document.getElementById('todoList').addEventListener('click', clickItem);