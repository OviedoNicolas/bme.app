let mainUrlApi = "http://localhost:3002/";
let mainData = []

const guardarPaso = (paso) => {
    localStorage.setItem('config_step', paso);
};

const obtenerPaso = () => {
    return localStorage.getItem('config_step');
};

const mostrarPasoActual = () =>{
    let config_step = obtenerPaso();
    let pasos = document.getElementsByClassName('config__pasos');
    
    for (let i = 0; i < pasos.length; i++) {
        pasos[i].classList.add('hidden');
    };
    
    if (config_step) {
        const pasoActual = document.getElementById(`paso${config_step}`);
        if (pasoActual) {
            pasoActual.classList.remove('hidden');
        };
    };
};

// !Completar URL (revisar)

const nameInput = document.getElementById('name');
const urlInput = document.getElementById('url');

nameInput.addEventListener('input', () => {
const nameValue = nameInput.value.trim();
const formattedValue = nameValue.replace(/\s+/g, ''); 
const urlTienda = 'beauting.me/' + formattedValue;
urlInput.value = urlTienda;
});

const crearTienda = () =>{
    let urlApi = 'v1/config/step1';

    let marca = document.getElementById('name').value;
    let url = document.getElementById('url').value;
    let whatsapp = document.getElementById('what').value;
    let address = document.getElementById('address').value;
    let floor = document.getElementById('floor').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;

    if (marca.trim() === '' || url.trim() === ''|| whatsapp.trim() === ''|| address.trim() === ''|| floor.trim() === ''|| city.trim() === ''|| state.trim() === '') {
        showAlert("ATENCION!", "Se deben completar todos los datos...");
        return;
    };

    let params = { 
        name: marca,
        url: url,
        what: whatsapp,
        address: address,
        floor: floor,
        city: city,
        state: state,
    };
    let headers = {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    };

    fetch(mainUrlApi + urlApi, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

//funcion para conectarse a la api y traer la informacion de la grilla de dias
const loadParams = () => {
    let url = 'v1/config/schedule';
    console.log('call loadParams:', mainUrlApi, url);

    fetch(mainUrlApi + url, { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }, 
        //body: JSON.stringify(params) 
        })
        .then(response => response.json())
        .then(res => {   
            mainData = res;
            console.log("res:", res);
                
            if (res.status == 'ok') {
                console.log("got agenda!!! YEAH!");
                console.log(res);

                let _html = "";
                let _html2 = ""
                for (let i=0; i<res.config.length; i++) {
                    let objeto = res.config[i];
                    _html +=
                    `<tr>
                        <td class='day-agenda-labels'>
                            ${objeto.hr}
                        </td>
                        <td>
                            <div class=${objeto.lun ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'lun')">
                                <i class="${objeto.lun ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <div class=${objeto.mar ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'mar')">
                                <i class="${objeto.mar ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <div class=${objeto.mie ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'mie')">
                                <i class="${objeto.mie ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <div class=${objeto.jue ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'jue')">
                                <i class="${objeto.jue ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <div class=${objeto.vie ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'vie')">
                                <i class="${objeto.vie ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                        </tr>`;
                    _html2 +=
                    `<tr>
                        <td class='day-agenda-labels'>
                            ${objeto.hr}
                        </td>
                        <td>
                            <div class=${objeto.sab ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'sab')">
                                <i class="${objeto.sab ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                        <td>
                            <div class=${objeto.dom ? 'cell-agenda-check' : 'cell-agenda'} onclick="changeClass(this, ${i}, 'dom')">
                                <i class="${objeto.dom ? 'fa fa-check fa-lg' : 'fa fa-close fa-lg'}" aria-hidden='true'></i>
                            </div>
                        </td>
                    </tr>`;
                    };

                document.getElementById('tb_lun-vie').innerHTML = _html;
                document.getElementById('tb_sab-dom').innerHTML = _html2;
            }
            else if (res.status == 'error') {
                if (res.data == 1005 || res.data == 5004) {
                    location.href = "/login";
                }
                else {
                    console.log("ERROR NO IDENTIFICADO: ", JSON.stringify(res));
                }
            }
        })
    .catch(err => console.log(err) );
}

//funcion para cambiar la clase y el iconmo de la grilla de dias
const changeClass = (element, index, day) => {
    element.classList.toggle('cell-agenda');
    element.classList.toggle('cell-agenda-check');

    const iconElement = element.querySelector('i');
    const currentIconClass = iconElement.classList.contains('fa-check') ? 'fa-check' : 'fa-close';

    iconElement.classList.remove(currentIconClass);
    iconElement.classList.add(currentIconClass === 'fa-check' ? 'fa-close' : 'fa-check');

    mainData.config[index][day] = !mainData.config[index][day];
    console.log(mainData);
}

//funcion para habilitar o desabilitar la grilla de fines de semana
const clickWeekends = () => {
    let tb_weekend = document.getElementById ("tb_weekend");
    tb_weekend.classList.toggle("hidden");
}

window.onload = mostrarPasoActual;window.onload = () => {
    mostrarPasoActual();
    loadParams();
};