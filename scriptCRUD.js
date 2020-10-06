const url = 'http://localhost:3000/data';
const divResult = document.getElementById('divResult');

async function sendName(event) {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const JobTtile = document.getElementById('job_title').value;

    const user = {
        first_name: firstName,
        last_name: lastName,
        job_title: JobTtile
    };

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    const response = await fetch(request)
    const result = await response.json();

    divResult.innerHTML = '';
    getNames();
}

async function getNames() {
    const response = await fetch(url);
    const result = await response.json();

    result.forEach(element => {
        divResult.insertAdjacentHTML('beforeend',
            `
                <li>
                    <p>${element.first_name}</p>
                    <p>${element.last_name}</p>
                    <p>${element.job_title}</p>
                    <button onclick="deleteName(${element.id})">Deletar</button>
                    <button onclick="editName(${element.id})">Editar</button>
                </li>
            `)
    });
}

async function deleteName(id) {
    const urlDelete = `http://localhost:3000/data/${id}`;

    const user = {
        first_name: '',
        last_name: '',
        job_title: ''
    }

    const request = new Request(urlDelete, {
        method: 'DELETE',
        body: JSON.stringify(user), //OBJETO NÃO É OBRIGATÓRIO PASSAR. É bom para o back fazer validações, mas se não for nessário só precisa passar a url com id
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    const response = await fetch(request);
    const result = await response.json();

    divResult.innerHTML = '';
    getNames();
}

async function editName(id) {
    const urlEdit = `http://localhost:3000/data/${id}`;

    const user = {
        first_name: 'Lucas', //Pegar de formulários os dados
        last_name: 'Valentim',
        job_title: 'Marceneiro'
    }

    const request = new Request(urlEdit, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    const response = await fetch(request);
    const result = await response.json();

    divResult.innerHTML = '';
    getNames();
}

getNames();