const form = document.getElementById("cadastro");
const nome = document.getElementById("nome");
const dataNasc = document.getElementById("dataNasc");
const email = document.getElementById("email");
const nome_usuario = document.getElementById("nome_usuario");
const senha = document.getElementById("senha");
const confirmar_senha = document.getElementById("confirmar_senha");

function mostrar(event) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
  console.log(
    nome.value,
    dataNasc.value,
    email.value,
    nome_usuario.value,
    senha.value,
    confirmar_senha.value
  );
  event.preventDefault();
}
