let ulTarefasDia = document.querySelector('#tarefas__dia')
let ulTarefasNoite = document.querySelector('#tarefas__noite')

let valores = JSON.parse(localStorage.getItem('valores')) || [];

//função que cria o elemento
function criarLi(tarefa, periodo, index) {
    const liTarefas = document.createElement('li');
    liTarefas.classList.add('tarefas__lista__item');

    const spanTarefa = document.createElement('span');
    spanTarefa.textContent = tarefa + ' ';
    liTarefas.appendChild(spanTarefa);

    const btnRemover = document.createElement('button');
    btnRemover.innerHTML = 'Remover';
    btnRemover.setAttribute('id', 'btn__remover');

    btnRemover.onclick = () => {
        liTarefas.remove();
        console.log('Índice:', index);

        // Encontrar o índice novamente no array valores
        const indexValores = valores.findIndex(item => item.tarefa === tarefa);
        if (indexValores !== -1) {
            valores.splice(indexValores, 1);
            atualizarDados();
        } else {
            alert('Não foi possível remover o item.');
        }
    };

    const btnEditar = document.createElement('button');
    btnEditar.innerHTML = 'Editar';
    btnEditar.setAttribute('id', 'btn__editar');

    btnEditar.onclick = () => {
        const tarefaNova = prompt('Digite uma nova tarefa');
        const periodoNovo = prompt('Qual periodo (dia ou noite)').toLowerCase();
        
        spanTarefa.innerHTML = tarefaNova + ' ';
        const indexValores = valores.findIndex(item => item.tarefa === tarefa);
        if (indexValores !== -1) {
            valores[indexValores].tarefa = tarefaNova + ' ';
            valores[indexValores].periodo = periodoNovo;
            
        } else {
            alert('Não foi possível editar o item.');
        }

    // tive que passar essa atualização, porque quando eu editava o item, nao atualizava o parametro 'tarefa'
    // ai quando eu precisava remover o meu findIndex dava -1 e retornava o erro de nao é possivel remover
        tarefa = tarefaNova + ' ';
        periodo = periodoNovo
        atualizarDados();
        liTarefas.remove();

        if (periodo === "dia") {

            ulTarefasDia.appendChild(liTarefas)
            
        } else {
            ulTarefasNoite.appendChild(liTarefas)
        }
        console.log(valores)
    };     

    liTarefas.appendChild(btnRemover);
    liTarefas.appendChild(document.createTextNode(' '));
    liTarefas.appendChild(btnEditar);

    return liTarefas;
}


//função que exibe na tela os elementos com um forEach, ele percorre o arr criando uma li
//faz uma verificação e entende se o periodo usado no input é dia, caso sim, adicionamos a li na ul correta e entrega um index que sera utilizado para remover e editar
function exibirDadosSalvos() {

    valores.forEach((item, index) => {
        const liTarefas = criarLi(item.tarefa, item.periodo, index);

        if (item.periodo === "dia") {
            ulTarefasDia.appendChild(liTarefas);
        } else {
            ulTarefasNoite.appendChild(liTarefas);
        }
    });
}

// executa afunção ao abrir a tela, caso haja tarefas salvas no local storage, ja mostra
exibirDadosSalvos()

// salva os itens ao local storage
function atualizarDados() {
    localStorage.setItem('valores', JSON.stringify(valores));


}

//salva os itens no local storage
function salvarDados() {
    const inputTarefa = document.querySelector('#tarefa');
    const selectPeriodo = document.querySelector('#periodo');
    const botaoAdicionar = document.querySelector('.cabecalho__formulario__botao');

    botaoAdicionar.addEventListener('click', function(event) {
        event.preventDefault();
        const valorTarefa = inputTarefa.value;
        const valorPeriodo = selectPeriodo.value;

        if (valorPeriodo === '' || valorTarefa === '') {
            return;
        }

        const novaTarefa = {
            tarefa: valorTarefa,
            periodo: valorPeriodo
        };

        valores.push(novaTarefa);

        // Atualizar o DOM imediatamente
        const novaTarefaLi = criarLi(novaTarefa.tarefa, novaTarefa.periodo);
        if (valorPeriodo === 'dia') {
            ulTarefasDia.appendChild(novaTarefaLi);
        } else {
            ulTarefasNoite.appendChild(novaTarefaLi);
        }

        atualizarDados();
    });
}


//deixa funcional na tela
salvarDados()

