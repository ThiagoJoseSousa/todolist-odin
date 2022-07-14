//everything that todos have will go here

const createItem = () => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML= `
    <input type="checkbox">
    <div> item test1 </div>
    <input type="button" value="X">
    `
    document.getElementById('todoList').appendChild(item);
    
}