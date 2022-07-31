const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("userID");
const myParam = { userName: userName };
let url = "http://localhost:3000/request/outroUsuario";
let request = new XMLHttpRequest();
request.open("POST", url, true);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(myParam));
request.onload = () => {
  user = JSON.parse(request.response);
  document.querySelector("#nome").innerText = user.nome;
  document.querySelector("#usuario").innerText = user.nomeUsuario;
  document.querySelector("#sobre").innerText = user.sobreMim;
  document.querySelector("#header").src = user.imgBanner;
  document.querySelector("#foto").src = user.imgPerfil;
};

function buscar(e) {
  const resultados = document.getElementById("resultados");
  let match = e.value.match(/^[a-zA-Z]*/);
  let match2 = e.value.match(/\s*/);
  if (match2[0] === e.value) {
    resultados.innerHTML = "";
    return;
  }
  if (match[0] === e.value) {
    url = "http://localhost:3000/request/buscar";
    //url = "https://ola-dev-backend.herokuapp.com/request/buscar";
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ usuario: e.value }));
    request.onload = () => {
      let usuario = JSON.parse(request.response);
      resultados.innerHTML = "";
      if (usuario.usuario.length < 1) {
        resultados.innerHTML = `<p>Não foram encontrados resultados!</p>`;
        return;
      }
      console.log(typeof usuario);
      usuario.usuario.forEach((user, index) => {
        if (index > 0) resultados.innerHTML += `<hr>`;
        resultados.innerHTML += `<a href="./perfilOutro.html?userID=${user.nomeUsuario}">${user.nomeUsuario}</a>`;
      });
    };
    return;
  }
}