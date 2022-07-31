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
		url = "http://localhost:3000/request/buscar";
		//url = "https://ola-dev-backend.herokuapp.com/request/buscar";
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
			usuarios.usuario.forEach((user, index) => {
				if (index > 0) resultados.innerHTML += `<hr>`;
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
	url = "http://localhost:3000/request/usuario";
	//url = "https://ola-dev-backend.herokuapp.com/request/usuario";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(chave));
	request.onload = () => {
		let { user, posts } = JSON.parse(request.response);
		userName = user.nomeUsuario;
		document.querySelector("#nome").innerText = user.nome;
		document.querySelector("#usuario").innerText = user.nomeUsuario;
		document.querySelector("#sobre").innerText = user.descricao;
		document.querySelector("#header").src = user.imgBanner;
		document.querySelector("#foto").src = user.imgPerfil;
		document
			.querySelector("body")
			.setAttribute("style", `--themecolor: #${user.corTema}`);
		posts.forEach((post, index) => {
			if (index > 0) resultados.innerHTML += `<hr>`;
			posteres.innerHTML += `
			<div class="post">
			<div class="conteudoPost">
				<div class="topoPost">
					<img
						class="fotoMini"
						src="https://img2.gratispng.com/20180327/ssq/kisspng-computer-icons-user-profile-avatar-profile-5ab9e3b05772c0.6947928615221318883582.jpg"
						alt=""
					/>
					<p class="usuarioPost"><a href="">Usuario</a></p>
				</div>
				<p class="descricaoPost">Texto do Posto</p>
				<div class="interacoes">
					<a href=""><i class="fa-solid fa-heart"></i>0</a>
					<a href=""><i class="fa-solid fa-comment"></i>0</a>
				</div>
			</div>
		</div>
		`;
		});
	};
};
