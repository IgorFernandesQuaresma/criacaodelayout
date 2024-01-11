let ulTarefasDia = document.querySelector('#tarefas__dia')
let ulTarefasNoite = document.querySelector('#tarefas__noite')

let valores = JSON.parse(localStorage.getItem('valores')) || [];

//função que cria o elemento
function criarLi(tarefa, periodo, index) {
    const liTarefas = document.createElement('li');
    liTarefas.classList.add('tarefas__lista__item');
    liTarefas.innerHTML = tarefa + ' ';

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
        const periodoNovo = prompt('Qual periodo (dia ou noite)');

        liTarefas.textContent = tarefaNova;
        // Encontrar o índice novamente no array valores
        const indexValores = valores.findIndex(item => item.tarefa === tarefa);
        if (indexValores !== -1) {
            valores[indexValores].tarefa = tarefaNova + ' ';
            valores[indexValores].periodo = periodoNovo;
            atualizarDados();
        } else {
            alert('Não foi possível editar o item.');
        }
    };

    liTarefas.appendChild(btnRemover);
    liTarefas.appendChild(document.createTextNode(' '));
    liTarefas.appendChild(btnEditar);

    return liTarefas;
}



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

exibirDadosSalvos()

function atualizarDados() {
    localStorage.setItem('valores', JSON.stringify(valores));


}

function salvarDados() {
    const inputTarefa = document.querySelector('#tarefa');
    const selectPeriodo = document.querySelector('#periodo');
    const botaoAdicionar = document.querySelector('.cabecalho__formulario__botao');

    botaoAdicionar.addEventListener('click', function(event) {
        event.preventDefault();
        const valorTarefa = inputTarefa.value;
        let valorPeriodo = selectPeriodo.value;

        if (valorPeriodo === '' || valorTarefa === '') {
            
            return
        }

        if (valorPeriodo === 'dia') {
            const novaTarefa = {
                tarefa: valorTarefa,
                periodo: valorPeriodo
            };

            valores.push(novaTarefa);
            const novaTarefaD = criarLi(novaTarefa.tarefa, novaTarefa.periodo)
            ulTarefasDia.appendChild(novaTarefaD);
        } else {
            const novaTarefa = {
                tarefa: valorTarefa,
                periodo: valorPeriodo
            };

            valores.push(novaTarefa);
            const novaTarefaN = criarLi(novaTarefa.tarefa, novaTarefa.periodo)
            ulTarefasNoite.appendChild(novaTarefaN);
        }

        atualizarDados()
    });
}

salvarDados()

