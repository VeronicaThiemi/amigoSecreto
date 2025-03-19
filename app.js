let amigos = [];
let sorteio = []
let fazerSorteio = false;



function adicionarAmigo() {

    const nomeAmigo = document.getElementById('amigo').value.trim();

    if (nomeAmigo !== '' && !amigos.includes(nomeAmigo)) {
        amigos.push(nomeAmigo);
        document.getElementById('amigo').value = '';
        updateListaAmigos();
    } else {
        alert('Este nome já existe na lista de amigos. Por favor, digite um novo nome.');
    }

};


function updateListaAmigos() {

    const nomesListaAmigos = document.getElementById('lista-amigos');
    nomesListaAmigos.innerHTML = "<p>Nomes dos amigos:</p>";
    const ul = document.createElement('ul');

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${amigo}</span>
                        <button onclick="editarNome(${index})">Editar</button>
                        <button onclick="deletarNome(${index})">Deletar</button>`;
        ul.appendChild(li);
    });

    nomesListaAmigos.appendChild(ul);
};


function editarNome(index) {

    const nomeCorreto = prompt('Digite o nome correto:');

    if (nomeCorreto!== null && nomeCorreto.trim() !== '') {
        amigos[index] = nomeCorreto.trim();
        updateListaAmigos();
    }
};

function deletarNome(index) {

    if (confirm('Tem certeza de que deseja deletar este nome?')) {
        amigos.splice(index, 1);
        updateListaAmigos();
    }
};


function verificarLista(){
    
    if (amigos.length < 3) {
        alert('Por favor, insira, pelo menos, 3 nomes para iniciar o jogo.');
    }
    else {
        localStorage.setItem('participantes', JSON.stringify(amigos));
        window.location.href = 'jogo.html';
    }

}

function revelarAmigo() {

    const nomeUsuario = document.getElementById('nome-usuario').value.trim();
    if (nomeUsuario !== '') {
        if (!fazerSorteio) {
            const amigos = JSON.parse(localStorage.getItem('participantes')) || [];
            sorteio = atribuirAmigoSecreto(amigos);
            fazerSorteio = true;
        }

        const idUsuario = sorteio.find(pair => pair[0] === nomeUsuario);

        if (idUsuario) {
            document.getElementById('sorteio').innerHTML = `${nomeUsuario}, seu amigo secreto é ${idUsuario[1]}.`;
        } else {
            document.getElementById('sorteio').innerHTML = `${nomeUsuario}, seu nome não foi encontrado na lista de participantes do jogo.`;
        }
    } else {
        alert('Por favor, digite seu nome!');
    }

};

function limparTela() {

    document.getElementById('nome-usuario').value = '';
    document.getElementById('sorteio').innerHTML = '';
};


function atribuirAmigoSecreto(amigos) {
    const embaralharLista = amigos.slice().sort(() => Math.random() - 0.5);
    const sorteio = [];
    const amigosSorteados = {};

    for (let i = 0; i < embaralharLista.length; i++) {
       
        let indexAmigos = i;

        while (
            embaralharLista[i] === embaralharLista[indexAmigos] ||
            (amigosSorteados[embaralharLista[indexAmigos]] &&
                Object.keys(amigosSorteados).length < embaralharLista.length)
        ) {
            indexAmigos = Math.floor(Math.random() * embaralharLista.length);
        }

        sorteio.push([embaralharLista[i], embaralharLista[indexAmigos]]);
        amigosSorteados[embaralharLista[indexAmigos]] = true;
    }

    return sorteio;
};