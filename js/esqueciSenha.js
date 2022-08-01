const email = document.querySelector("#emailSenha");

function mandarEmail(event) {
	event.preventDefault();
	//const url = "http://localhost:3000/auth/esqueci_senha";
	const url = "https://ola-dev-backend.herokuapp.com/auth/esqueci_senha";
	const mail = {
		email: email.value,
	};
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(mail));
	request.onload = async function () {
		console.log(this.response);
		alert(this.response);
	};
	return request.response;
}
