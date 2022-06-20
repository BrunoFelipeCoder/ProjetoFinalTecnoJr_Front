//Obtendo as informações dos inputs do html através do ID
const nome = document.getElementById("nome");
const dataNasc = document.getElementById("dataNasc");
const email = document.getElementById("email");
const nome_usuario = document.getElementById("nome_usuario");
const senha = document.getElementById("senha");
const confirmar_senha = document.getElementById("confirmar_senha");

//Função para cadastrar o usuário no Banco de Dados
function cadastrarUsuario(user) {
  //url do caminho da API para adicionar o usuário no BD
  const url = "https://ola-dev-backend.herokuapp.com/auth/cadastro";
  //const url = "http://localhost:3000/auth/cadastro";
  //Criando uma instancia do objeto XMLHttpRequest que serve parar facilitar o envio e obtenção de dados do servidor sem que precise recarregar toda a pagina
  let request = new XMLHttpRequest();
  //Abrindo a requisição tendo como parâmetros o método que vai ser usado e o endereço do servidor (ambos obrigatórios) além de informar se vai ser uma operação assíncrona(true) ou síncrona(false), essa por sua vez é optativa
  request.open("POST", url, true);
  //Especificando que tipo de cabeçalho será enviado na requisição, tendo como dois parâmetros obrigatórios o header e seu value
  request.setRequestHeader("Content-Type", "application/json");
  //Enviando o arquivo usando o send, e como parâmetro passando o user (transformado em um JSON através do JSON.stringify())
  request.send(JSON.stringify(user));
  //após ter enviado o arquivo, usamos o onload para saber a resposta do servidor
  request.onload = () => {
    alert(request.response);
    if (request.status !== 200) {
      return false;
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
  //Criando um objeto user, e colocando dentro dele as informações obtidas do form de cadastro fornecidas pelo usuário
  const user = {
    nome: nome.value,
    email: email.value,
    nomeUsuario: nome_usuario.value,
    senha: senha.value,
  };
  //Chamando a função conferirSenha() e a conferirData(), dependendo dos seus retornos, a função para por aqui, mas a pagina não é recarregada devido ao event.preventDefault();
  if (!conferirSenha(user) || !conferirData()) {
    event.preventDefault();
    return false;
  }
  //Após passar pela verificação acima, é chamada a função cadastrarUsuario dentro de uma estrutura de condição para que dependendo da resposta siga caminho diferentes
  if (!cadastrarUsuario(user)) {
    event.preventDefault();
    return false;
  }
  location.reload();
  return true;
}
