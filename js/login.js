const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
let chave;
let url;

function logar(event) {
  event.preventDefault();
  const user = {
    usuario: usuario.value,
    senha: senha.value,
  };
  //url = "http://localhost:3000/auth/autenticacao";
  url = "https://ola-dev-backend.herokuapp.com/auth/autenticacao";
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(user));
  request.onload = () => {
    if (request.status == 200) {
      chave = request.response;
      localStorage.setItem("chave", chave);
      //window.location.replace("http://127.0.0.1:5500/html/perfil.html");
      window.location.replace(
        "https://brunofelipecoder.github.io/ProjetoFinalTecnoJr_Front/html/perfil.html"
      );
    } else {
      console.log(request.response);
      console.log("não entrou");
    }
  };
}
