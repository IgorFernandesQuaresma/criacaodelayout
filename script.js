let ulTarefasDia = document.querySelector('#tarefas__dia')
let ulTarefasNoite = document.querySelector('#tarefas__noite')

let valoresDia = JSON.parse(localStorage.getItem('valoresDia')) || [];
let valoresNoite = JSON.parse(localStorage.getItem('valoresNoite')) || [];

console.log(ulTarefasDia, ulTarefasDia)





//função que cria o elemento
function criarLi(tarefa, periodo) {

      const liTarefasDia = document.createElement('li')
      liTarefasDia.classList.add('tarefas__lista__item')
      liTarefasDia.innerHTML = "fiz com DOM" + ' '

      const btnRemover = document.createElement('button')
      btnRemover.innerHTML = 'Remover'
      btnRemover.setAttribute('id', 'btn__remover')

      const btnEditar = document.createElement('button')
      btnEditar.innerHTML = 'Editar' 
      btnEditar.setAttribute('id', 'btn__editar')

      liTarefasDia.appendChild(btnRemover)
      liTarefasDia.appendChild(document.createTextNode(' '));
      liTarefasDia.appendChild(btnEditar)

      ulTarefasDia.appendChild(liTarefasDia)
}

criarLi();

function atualizarDados() {
    localStorage.setItem('valoresDia', JSON.stringify(valoresDia));
    localStorage.setItem('valoresNoite', JSON.stringify(valoresNoite));

}

function salvarDados() {
    const inputTarefa = document.querySelector('#tarefa');
    const selectPeriodo = document.querySelector('#periodo');
    const botaoAdicionar = document.querySelector('.cabecalho__formulario__botao');

    botaoAdicionar.addEventListener('click', function(event) {
        event.preventDefault();
        const valorTarefa = inputTarefa.value;
        const valorPeriodo = selectPeriodo.value;

        if (valorPeriodo === '' || valorTarefa === '') {
            
            return
        }

        if (valorPeriodo === 'dia') {
            let novaTarefaDia = {
                tarefa: valorTarefa,
                periodo: valorPeriodo
            };

            valoresDia.push(novaTarefaDia);
        } else {
            let novaTarefaNoite = {
                tarefa: valorTarefa,
                periodo: valorPeriodo
            };

            valoresNoite.push(novaTarefaNoite);
        }

        atualizarDados()
    });
}

salvarDados()

console.log(valoresNoite)