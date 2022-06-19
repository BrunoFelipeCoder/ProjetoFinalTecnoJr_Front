const email = document.getElementById("email");
const codigo = document.getElementById("codigo");
function mandaremail(event) {
  event.preventDefault();
  const url = "https://ola-dev-backend.herokuapp.com/auth/confirmar_email";
  const mail = {
    email: email.value,
  };
  console.log(mail);
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(mail));
  request.onload = function () {
    console.log(this.response);
  };
  console.log(this.response);
  return request.response;
}

function verificarcodigo(event) {
  event.preventDefault();
  const url = "https://ola-dev-backend.herokuapp.com/auth/confirmar_codigo";
  const mail = {
    email: email.value,
    codigo: codigo.value,
  };
  console.log(mail);
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(mail));
  request.onload = function () {
    if (this.response == "oi") {
      console.log(this.response);
      return window.location.replace(
        "http://127.0.0.1:5500/html/cadastro.html"
      );
    } else {
      console.log(this.response);
      return alert("Codigo errado!");
    }
  };
}
