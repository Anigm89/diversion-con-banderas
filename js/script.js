const listadoPaises = document.getElementById('countries-list'); 

const ObtenerPaises = async () =>{
    try{
        const response = await fetch('https://restcountries.com/v3/all');
        if(!response.ok){
            throw new Error ('Ha surgido un error ', response.estatus)
        }
        const data = await response.json();
        console.log('d',data)
            //ordenar alfabeticamente
            const paisesOrdenados = data.sort((a, b) => {
                const nombreA = a.name.common.toUpperCase();
                const nombreB = b.name.common.toUpperCase();
                if (nombreA < nombreB) {
                    return -1;
                }
                if (nombreA > nombreB) {
                    return 1;
                }
                return 0;
            });
        mostrarPaises(paisesOrdenados);
    }
    catch(error){
        console.log('Error', error)
    }
}

function mostrarPaises(data){

    data.forEach(pais => {
       let nombrepais = pais.name.common;
           //  console.log(nombrepais);
        let listado =`
        <div class="pais" >
            <img src="${pais.flags[0]}" alt="Bandera de ${nombrepais}">
            <p>${nombrepais}</p>
        </div> `
        listadoPaises.innerHTML += listado;
        mostrarDetalles(data)
    });


}

    
function mostrarDetalles(data){
    const cadaPais = document.querySelectorAll('.pais');
    //console.log(cadaPais)
    cadaPais.forEach((elem,index)=>{
        elem.addEventListener('click', () => {
            console.log('p',elem)
            
            popUp(data,index);
            
        })
    })
   } 
    
 

function popUp(data, index){
    console.log('pop', index)
   const ventana = document.getElementById('Pop_up');
   const paisSeleccionado = data[index];    console.log('ps',paisSeleccionado)

        let popup =`
            <div id="popup">
                <a id="cerrar"> &times; </a>
                <img src="${paisSeleccionado.flags[0]}">
                <div id="container">
                    <h4>${paisSeleccionado.name.common}</h4>
                    <p>Capital:${paisSeleccionado.capital} </p>
                    <p>Población: ${paisSeleccionado.population} </p>
                    <p>Lado de la carretera: ${paisSeleccionado.car.side}</p>
                </div>
            </div>`
    ventana.innerHTML = popup;
    cerrarPopUp()
}


function cerrarPopUp()
{
    cerrar= document.getElementById('cerrar');
    cerrar.addEventListener('click', () =>{
        location.reload();

    })
    
}

ObtenerPaises();
