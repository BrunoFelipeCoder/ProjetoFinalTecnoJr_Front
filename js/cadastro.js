const form = document.getElementById("cadastro");
const nome = document.getElementById("nome");
const dataNasc = document.getElementById("dataNasc");
const email = document.getElementById("email");
const nome_usuario = document.getElementById("nome_usuario");
const senha = document.getElementById("senha");
const confirmar_senha = document.getElementById("confirmar_senha");

function cadastrarUsuario(url, user) {
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(user));
  request.onload = function () {
    console.log(this.response);
  };
  console.log(this.response);
  return request.response;
}

function conferirSenha(user) {
  if (user.senha !== confirmar_senha.value) {
    alert("As senhas não conferem!");
    return false;
  }
  return true;
}

function conferirData(user) {
  const data = new Date();
  const [ano, mes, dia] = dataNasc.value.split("-").map(Number);
  if (ano < 1900) {
    alert("Ano inválido");
    return false;
  }
  if (data.getFullYear() - ano < 13) {
    alert("Idade mínima não atingida!");
    return false;
  }
  return true;
}

function cadastro(event) {
  const user = {
    nome: nome.value,
    email: email.value,
    nomeUsuario: nome_usuario.value,
    senha: senha.value,
  };
  if (!conferirSenha(user)) {
    event.preventDefault();
    return false;
  }
  if (!conferirData(user)) {
    event.preventDefault();
    return false;
  }
  const url = "http://localhost:3000/auth/cadastro";
  cadastrarUsuario(url, user);
  alert("Usuário Cadastrado com sucesso!");
  return window.location.replace("http://127.0.0.1:5500/html/login.html");
}
