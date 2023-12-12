'use strict'

//Criando variável que irá transferir as informações da lista e armazenar no Banco
const getBank = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

//Criando variável que irá transferir as informações do banco para o LocalStorage
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));


//Função que cria uma tarefa no id = todoList
const createItem = (task, status, index) => {

    //Criando uma novo item que seria a label
    const item = document.createElement('label');   

    //Adicionando a classe 'todo__item' na variável item
    item.classList.add('todo__item');

    //Colocando HTML dentro do item = label
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${index}>   
        <div>${task}</div>
        <input type="button" value="x" data-indice=${index}>
    `

    //Pegando o elemento ID e adicionando a variável item
    document.getElementById('todoList').appendChild(item);

}

//Função que limpa as tarefas na tela que acabam repetindo
const clearTask = () => {
    const todoList = document.getElementById('todoList');
    
    //Usei a propriedade while 'enquanto', para realizar a remoção do último filho que é gerado pelo função render
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

//Criando função que trará as informações do 'bancos de dados' e irá atualizar na tela
const render = () => {

    //Limpa todas as tarefas que estiverem na tela
    clearTask();

    const bank = getBank();

    //Usando o for each para percorrer todas as informações do 'banco de dados'
    bank.forEach((item, index) => createItem (item.task, item.status, index));
}

//Criando um função que verifica qual tecla foi digitada
const addItem = (event) => {
    const key = event.key;
    const text = event.target.value;
    

    //Criar uma condição para toda vez que aperta o 'Enter' adicionar uma tarefa na tela
    if (key === 'Enter'){
        const bank = getBank();
        bank.push ({'task': text, 'status':''});
        setBank(bank);
        render();
        event.target.value = '';
    }
}

//Criando variável que aplica a funcionalidade de remover o item da lista
const removeItem = (index) => {
    const bank = getBank();
    bank.splice(index, 1);
    setBank(bank);
    render();
}

const updateItem = (index) => {
    const bank = getBank();
    bank[index].status = bank[index].status === '' ? 'checked' : '';
    setBank(bank);
    render();
}

//Criando um evento de click para os componentes de 'check' e 'remove' da lista
const clickItem = (event) => {
    const element = event.target;
    console.log(element.type);
    if (element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index);
    }else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);


render();