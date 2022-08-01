let userName;

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
				chave: localStorage.getItem("chave"),
			})
		);
		request.onload = () => {
			let usuarios = JSON.parse(request.response);
			resultados.innerHTML = "";
			if (usuarios.usuario.length < 1) {
				resultados.innerHTML = `<p>Não foram encontrados resultados!</p>`;
				return;
			}
			usuarios.usuario.forEach((user) => {
				if (userName != user.nomeUsuario)
					resultados.innerHTML += `<a href="./perfilOutro.html?userID=${user.nomeUsuario}">${user.nomeUsuario}</a>`;
			});
		};
		return;
	}
}

window.onload = () => {
	const posteres = document.querySelector("#feed");
	const chave = {
		chave: localStorage.getItem("chave"),
	};
	//url = "http://localhost:3000/request/usuario";
	url = "https://ola-dev-backend.herokuapp.com/request/usuario";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(chave));
	request.onload = () => {
		let { user, posts } = JSON.parse(request.response);
		userName = user.nomeUsuario;
		document.querySelector("#nome").innerText = user.nome;
		document.querySelector("#usuario").innerText = `@${user.nomeUsuario}`;
		document.querySelector("#sobre").innerText = user.descricao;
		document.querySelector("#header").src = user.imgBanner;
		document.querySelector("#foto").src = user.imgPerfil;
		document
			.querySelector("body")
			.setAttribute("style", `--themecolor: #${user.corTema}`);
		let cont = 0;
		posts.forEach((post) => {
			console.log(post);
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
							<button onclick="like(event)"><i class="fa-solid fa-heart">${post.likes}</i></button>
							<a href=""><i class="fa-solid fa-comment">${post.numeroComentarios}</i></a>
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
						<button onclick="like({event, ${
							post.codigoPost
						}})"><i class="fa-solid fa-heart">${
					post.likes
				}</i></button>
						<a href=""><i class="fa-solid fa-comment">${post.numeroComentarios}</i></a>
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
};

function like({ event, codigo }) {
	event.preventDefault();
	const like = {
		like: 1,
		codigoPost: codigo,
	};
	console.log(codigo);
	/*const url =
		"https://ola-dev-backend.herokuapp.com/request/atualizarCorTema";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(like));
	request.onload = () => {
		alert(request.response);
	};*/
}
