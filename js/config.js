function atualizarImgPerfil(event) {
	event.preventDefault();
	const imagemPerfil = document.querySelector("#imagemPerfil");
	const imgPerfil = {
		chave: localStorage.getItem("chave"),
		imgPerfil: imagemPerfil.value,
	};
	const url =
		"https://ola-dev-backend.herokuapp.com/request/atualizarImgPerfil";
	//url = "http://localhost:3000/request/atualizarImgPerfil";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(imgPerfil));
	request.onload = () => {
		alert(request.response);
		imagemPerfil.value = "";
	};
}

function atualizarImgBanner(event) {
	event.preventDefault();
	const imagemBanner = document.querySelector("#imagemBanner");
	const imgBanner = {
		chave: localStorage.getItem("chave"),
		imgBanner: imagemBanner.value,
	};
	//url = "http://localhost:3000/request/atualizarImgBanner";
	const url =
		"https://ola-dev-backend.herokuapp.com/request/atualizarImgBanner";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(imgBanner));
	request.onload = () => {
		alert(request.response);
		imagemBanner.value = "";
	};
}

function atualizarSobreMim(event) {
	event.preventDefault();
	const sobreMim = document.querySelector("#sobreMim");
	const sobremim = {
		chave: localStorage.getItem("chave"),
		sobreMim: sobreMim.value,
	};
	//url = "http://localhost:3000/request/atualizarSobreMim";
	const url =
		"https://ola-dev-backend.herokuapp.com/request/atualizarSobreMim";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(sobremim));
	request.onload = () => {
		alert(request.response);
		sobreMim.value = "";
	};
}

function atualizarCorTema(event) {
	event.preventDefault();
	let cor = document.querySelector("#corTema").value;
	cor = cor.replace("#", "");
	const corTema = {
		chave: localStorage.getItem("chave"),
		corTema: cor,
	};
	//url = "http://localhost:3000/request/atualizarCorTema";
	const url =
		"https://ola-dev-backend.herokuapp.com/request/atualizarCorTema";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(corTema));
	request.onload = () => {
		alert(request.response);
		cor = "";
	};
}
