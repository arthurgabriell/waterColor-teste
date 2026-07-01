// parte de shock
let servidores = [];
let indiceEditar = -1;

function salvar() {
  let nome = document.getElementById('nome').value;
  let email = document.getElementById('email').value;
  let senha = document.getElementById('senha').value;

  if (nome == '' || email == '' || senha == '') {
    alert('Preencha todos os campos!');
    return;
  }

  if (indiceEditar == -1) {
    servidores.push({
      nome: nome,
      email: email,
      senha: senha,
    });
  } else {
    servidores[indiceEditar] = {
      nome: nome,
      email: email,
      senha: senha,
    };

    indiceEditar = -1;
  }

  limpar();
  listar();
}

function listar() {
  let tabela = document.getElementById('tabela');

  tabela.innerHTML = '';

  servidores.forEach((servidor, index) => {
    tabela.innerHTML += `
        <tr>
            <td>${servidor.nome}</td>
            <td>${servidor.email}</td>


            <td>


                <button class="editar" onclick="editar(${index})">
                    Editar
                </button>


                <button class="excluir" onclick="excluir(${index})">
                    Excluir
                </button>


            </td>


        </tr>
        `;
  });
}

function editar(index) {
  document.getElementById('nome').value = servidores[index].nome;
  document.getElementById('email').value = servidores[index].email;
  document.getElementById('senha').value = servidores[index].senha;

  indiceEditar = index;
}

function excluir(index) {
  servidores.splice(index, 1);

  listar();
}

function limpar() {
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('senha').value = '';
}
