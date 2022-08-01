const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("userID");
const myParam = { userName: userName };
const posteres = document.querySelector("#feed");
//let url = "http://localhost:3000/request/outroUsuario";
let url = "https://ola-dev-backend.herokuapp.com/request/outroUsuario";
let request = new XMLHttpRequest();
request.open("POST", url, true);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(myParam));
request.onload = () => {
	let { user, posts } = JSON.parse(request.response);
	document.querySelector("#nome").innerText = user.nome;
	document.querySelector("#usuario").innerText = `@${user.nomeUsuario}`;
	document.querySelector("#sobre").innerText = user.sobreMim;
	document.querySelector("#header").src = user.imgBanner;
	document.querySelector("#foto").src = user.imgPerfil;
	document.querySelector(
		"#seguindo"
	).innerText = `Seguindo ${user.seguindo.length}`;
	document.querySelector(
		"#seguidores"
	).innerText = `Seguidores ${user.seguidores.length}`;
	document
		.querySelector("body")
		.setAttribute("style", "--themecolor: #" + user.corTema);
	let cont = 0;
	posts.forEach((post) => {
		if (!post.imagem.length) {
			posteres.innerHTML += `
				<div class="post">
					<div class="conteudoPost">
						<div class="topoPost">
							<img
								class="fotoMini"
								src="${user.imgPerfil}"
								alt=""
							/>
							<p class="nomePost"><a href="">${user.nome}</a></p>
							<p class="usuarioPost"><a href="">@${user.nomeUsuario}</a></p>

						</div>
						<p class="descricaoPost">${post.texto}</p>
						<div class="interacoes">
						<a onclick="like(event)">${post.likes} <i class="fa-solid fa-heart"></i></a>
						<a href="">${post.numeroComentarios} <i class=
						</div>
					</div>
				</div>
			`;
		} else {
			posteres.innerHTML += `
			<div class="post">
				<div class="conteudoPost">
					<div class="topoPost">
						<img
							class="fotoMini"
							src="${user.imgPerfil}"
							alt=""
						/>
						<p class="nomePost"><a href="">${user.nome}</a></p>
						<p class="usuarioPost"><a href="">@${user.nomeUsuario}</a></p>
					</div>
					<p class="descricaoPost">${post.texto}</p>
					<div class="wrapperIMG" id="post${++cont}"></div>
					<div class="interacoes">
					<a onclick="like(event)">${post.likes} <i class="fa-solid fa-heart"></i></a>
					<a href="">${post.numeroComentarios} <i class=
					</div>
				</div>
			</div>
		`;
			post.imagem.forEach((imgLink) => {
				let teste = document.querySelector(`#post${cont}`);
				teste.innerHTML += `<img src="${imgLink}" class="midiaPost">`;
			});
		}
	});
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
		//url = "http://localhost:3000/request/buscar";
		url = "https://ola-dev-backend.herokuapp.com/request/buscar";
		let request = new XMLHttpRequest();
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(
			JSON.stringify({
				userName: e.value,
			})
		);
		request.onload = () => {
			let usuario = JSON.parse(request.response);
			resultados.innerHTML = "";
			if (usuario.usuario.length < 1) {
				resultados.innerHTML = `<p>Não foram encontrados resultados!</p>`;
				return;
			}
			usuario.usuario.forEach((user) => {
				if (user.chave == localStorage.getItem("chave"))
					resultados.innerHTML += `<a href="./perfil.html">${user.nomeUsuario}</a>`;
				else
					resultados.innerHTML += `<a href="./perfilOutro.html?userID=${user.nomeUsuario}">${user.nomeUsuario}</a>`;
			});
		};
		return;
	}
}
