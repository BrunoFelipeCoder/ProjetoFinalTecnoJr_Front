let post = {
	chave: "",
	imgPost: [],
	texto: "",
};

function salvarIMG(event) {
	event.preventDefault();
	let img = document.querySelector("#imgPost");
	post.imgPost.push(img.value);
	img.value = "";
}

function postarPost(event) {
	event.preventDefault();
	if (!(post.imgPost.length < 1)) {
		post.texto = document.querySelector("#descricaoPost").value;
		console.log(post.texto);
		post.chave = localStorage.getItem("chave");
		url = "http://localhost:3000/request/criarPost";
		let request = new XMLHttpRequest();
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(JSON.stringify(post));
		request.onload = () => {
			alert(request.response);
		};
	} else {
		alert("Insira uma imagem ao menos!");
	}
}
