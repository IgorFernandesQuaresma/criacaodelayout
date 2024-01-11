let ulTarefasDia = document.querySelector('#tarefas__dia')
let ulTarefasNoite = document.querySelector('#tarefas__noite')

let valoresDia = JSON.parse(localStorage.getItem('valoresDia')) || [];
let valoresNoite = JSON.parse(localStorage.getItem('valoresNoite')) || [];

//função que cria o elemento
function criarLi(tarefa) {

      const liTarefas = document.createElement('li')
      liTarefas.classList.add('tarefas__lista__item')
      liTarefas.innerHTML = tarefa + ' '

      const btnRemover = document.createElement('button')
      btnRemover.innerHTML = 'Remover'
      btnRemover.setAttribute('id', 'btn__remover')

      btnRemover.onclick = () => {
        liTarefas.remove()
        removerTarefaDoLocalStorage(tarefa, periodo);
      }

      const btnEditar = document.createElement('button')
      btnEditar.innerHTML = 'Editar' 
      btnEditar.setAttribute('id', 'btn__editar')

      liTarefas.appendChild(btnRemover)
      liTarefas.appendChild(document.createTextNode(' '));
      liTarefas.appendChild(btnEditar)

      return liTarefas;     
}

criarLi();

function exibirDadosSalvos() {
    valoresDia.forEach(item => {
        const liTarefas = criarLi(item.tarefa, item.periodo);

        if (item.periodo === "dia") {
            ulTarefasDia.appendChild(liTarefas);
        } else {
            ulTarefasNoite.appendChild(liTarefas);
        }
    });

    valoresNoite.forEach(item => {
        const liTarefas = criarLi(item.tarefa, item.periodo);

        if (item.periodo === "dia") {
            ulTarefasDia.appendChild(liTarefas);
        } else {
            ulTarefasNoite.appendChild(liTarefas);
        }
    });
}

exibirDadosSalvos()

function atualizarDados() {
    localStorage.setItem('valoresDia', JSON.stringify(valoresDia));
    localStorage.setItem('valoresNoite', JSON.stringify(valoresNoite));

}

function removerTarefaDoLocalStorage(tarefa, periodo) {
    if (periodo === 'dia') {
        // Remover do array valoresDia
        const i = valoresDia.findIndex(item => item.tarefa === tarefa);
        if (i !== -1) {
            valoresDia.splice(i, 1);
            atualizarDados();
        }
    } else {
        // Remover do array valoresNoite
        const i = valoresNoite.findIndex(item => item.tarefa === tarefa);
        if (i !== -1) {
            valoresNoite.splice(i, 1);
            atualizarDados();
        }
    }
}

2
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
            let novaTarefaDia = {
                tarefa: valorTarefa,
                periodo: valorPeriodo
            };

            valoresDia.push(novaTarefaDia);
            const novaTarefaD = criarLi(novaTarefaDia.tarefa, novaTarefaDia.periodo)
            ulTarefasDia.appendChild(novaTarefaD);
        } else {
            let novaTarefaNoite = {
                tarefa: valorTarefa,
                periodo: valorPeriodo
            };

            valoresNoite.push(novaTarefaNoite);
            const novaTarefaN = criarLi(novaTarefaNoite.tarefa, novaTarefaNoite.periodo)
            ulTarefasNoite.appendChild(novaTarefaN);
        }

        atualizarDados()
    });
}

salvarDados()

