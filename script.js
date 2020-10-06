const url = 'https://viacep.com.br/ws/01001000/json';
const divResult = document.getElementById('divResult')
const form = document.getElementById('formId')

form.addEventListener('submit', e => {
    e.preventDefault();
    const cep = document.getElementById('cepId').value
    ChamaApi(cep);
})
async function ChamaApi(cep) { //o async não é obrigatório, apenas exemplo demostrando o funcionamento de async await
    // Chama api do via cep
    //fetch(url)
    //     .then(function (response) {
    //         console.log('Resposta do primeiro then', response);
    //         return response.json();
    //     })
    //     .then(function (result) {
    //         console.log(result);
    //         return result;
    //     });

    const urlFrom = `https://viacep.com.br/ws/${cep}/json`;

    const response = await fetch(urlFrom) //O await informa pro js esperar o retorno da chama do fetch. Dessa forma podemos salvar o retorno em uma variável
    const result = await response.json(); //Await usado com mesmo ideia acima

    console.log(result)

    renderList = document.createElement('li');

    renderList.innerHTML = `
        <span>${result.logradouro}</span>,
        <span>${result.bairro}</span>,
        <span>${result.uf}</span>
    `

    divResult.appendChild(renderList)
}