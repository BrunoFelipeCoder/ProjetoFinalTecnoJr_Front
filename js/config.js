function atualizarImgPerfil(event) {
  event.preventDefault();
  const imagemPerfil = document.getElementById("imagemPerfil");
  const imgPerfil = {
    chave: localStorage.getItem("chave"),
    imgPerfil: imagemPerfil.value,
  };
  url = "http://localhost:3000/request/atualizarImgPerfil";
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(imgPerfil));
  request.onload = () => {
    console.log("oi");
  };
}

function atualizarImgBanner(event) {
  event.preventDefault();
  const imagemBanner = document.getElementById("imagemBanner");
  const imgBanner = {
    chave: localStorage.getItem("chave"),
    imgBanner: imagemBanner.value,
  };
  url = "http://localhost:3000/request/atualizarImgBanner";
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(imgBanner));
}

function atualizarSobreMim(event) {
  event.preventDefault();
  const sobreMim = document.getElementById("sobreMim");
  const sobremim = {
    chave: localStorage.getItem("chave"),
    sobreMim: sobreMim.value,
  };
  url = "http://localhost:3000/request/atualizarSobreMim";
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(sobremim));
}
