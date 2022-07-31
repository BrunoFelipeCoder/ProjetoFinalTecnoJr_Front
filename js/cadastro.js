//Obtendo as informações dos inputs do html através do ID
const nome = document.getElementById("nome");
const dataNasc = document.getElementById("dataNasc");
let email = "";
const nome_usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const confirmar_senha = document.getElementById("senha2");
let url;

//Função para cadastrar o usuário no Banco de Dados
function cadastrarUsuario(user) {
	//url do caminho da API para adicionar o usuário no BD
	url = "https://ola-dev-backend.herokuapp.com/auth/cadastro";
	//url = "http://localhost:3000/auth/cadastro";
	//Criando uma instancia do objeto XMLHttpRequest que serve parar facilitar o envio e obtenção de dados do servidor sem que precise recarregar toda a pagina
	let request = new XMLHttpRequest();
	//Abrindo a requisição tendo como parâmetros o método que vai ser usado e o endereço do servidor (ambos obrigatórios) além de informar se vai ser uma operação assíncrona(true) ou síncrona(false), essa por sua vez é optativa
	request.open("POST", url, true);
	//Especificando que tipo de cabeçalho será enviado na requisição, tendo como dois parâmetros obrigatórios o header e seu value
	request.setRequestHeader("Content-Type", "application/json");
	//Enviando o arquivo usando o send, e como parâmetro passando o user (transformado em um JSON através do JSON.stringify())
	request.send(JSON.stringify(user));
	console.log(request);
	//após ter enviado o arquivo, usamos o onload para saber a resposta do servidor
	request.onload = () => {
		chave = request.response;
		localStorage.setItem("chave", chave);
		if (request.status == 200) {
			window.location.replace(
				"https://brunofelipecoder.github.io/ProjetoFinalTecnoJr_Front/html/configuracoesPerfil.html"
			);
		}
		return true;
	};
}

//Função para conferir se as senhas informadas pelo usuário são iguais, tendo como parâmetro o objeto user
function conferirSenha(user) {
	if (user.senha !== confirmar_senha.value) {
		alert("As senhas não conferem!");
		return false;
	}
	return true;
}

//Função para conferir se a data de nascimento informada pelo usuário é válida ou não
function conferirData() {
	//Criando uma variável para armazenar o ano atual
	const data = new Date().getFullYear();
	//Separando a informação do input de data (String) em três utilizando o - como separador, e colocando esses grupos nas variáveis ano mes e dia, além de transformar os mesmos em tipo Number
	const [ano, mes, dia] = dataNasc.value.split("-").map(Number);
	if (ano < 1950) {
		console.log("oi");
		alert("Ano inválido");
		return false;
	}
	if (data - ano < 13) {
		console.log("hello");
		alert("Idade mínima não atingida!");
		return false;
	}
	return true;
}

//Função principal da página cadastro, onde ela chamará todas as três funções acima durante sua execução
function cadastro(event) {
	event.preventDefault();
	console.log(email);
	//Criando um objeto user, e colocando dentro dele as informações obtidas do form de cadastro fornecidas pelo usuário
	const user = {
		nome: nome.value,
		email,
		nomeUsuario: nome_usuario.value,
		senha: senha.value,
		dataNascimento: dataNasc.value,
	};

	if (user.email == "") {
		alert("Token invalido!");
		//window.location.replace("http://127.0.0.1:5500/html/login.html");
		window.location.replace(
			"https://brunofelipecoder.github.io/ProjetoFinalTecnoJr_Front/html/login.html"
		);
	}

	if (!conferirSenha(user) || !conferirData(user)) {
		return event.preventDefault();
	}

	if (!cadastrarUsuario(user)) {
		event.preventDefault();
		return alert("Usuário cadastrado!");
	}

	//Chamando a função conferirSenha() e a conferirData(), dependendo dos seus retornos, a função para por aqui, mas a pagina não é recarregada devido ao event.preventDefault();
	return true;
}

function verificarToken(codigo) {
	//url = "http://localhost:3000/auth/verificar_token/";
	url = "https://ola-dev-backend.herokuapp.com/auth/verificar_token";
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(codigo));
	console.log(request);
	request.onload = () => {
		email = request.response;
	};
}

window.onload = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get("token");
	const myParam = { token: token };
	verificarToken(myParam);
};
