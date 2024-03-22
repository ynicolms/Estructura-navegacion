
const url = "https://reqres.in/api/users?delay=3"



const getUsersUsingAsyncAwait = async (url) => {

    const resolve = await fetch(url); //JSON CRUDO
    const objetoUsuarios = await resolve.json(); //covertit de JSON a Object
    console.log(objetoUsuarios); // data, page, paginas
    const arregloUsuarios = objetoUsuarios.data; 
    console.log(arregloUsuarios); // este arreglo va a contener [{nombre, email, apellido}] de los seis usuarios 
    //const valorPagina = objetoUsuarios.page;
    //console.log(valorPagina); // 1

    // Guardar en el Local Storage con la marca de tiempo
    const timestamp = new Date(); 
    const dataToStore = { info: objetoUsuarios.data, hora: timestamp };
    localStorage.setItem("PrimerRequest", JSON.stringify(dataToStore));

    guardarDatosEnLocalStorage(arregloUsuarios); 
    imprimirCartasEnElHtml( crearCartasDeUsuarios(arregloUsuarios) );

}


const crearCartasDeUsuarios = ( arregloDondeEstanLosUsuarios ) => {
    // [ "<div>...</div", "", "" ];
return arregloDondeEstanLosUsuarios.map( porCadaUsuario => // estilo de bootstrap para que nos imprima las card de cada ususario, junto con la img de cada uno, junto con el nombre, apellido y correo. 
`<div class="card" style="width: 18rem;"> 
<img src="${porCadaUsuario.avatar}" class="card-img-top rounded-circle " alt="...">
<div class="card-body">
  <h5 class="card-title">${ porCadaUsuario.first_name} ${porCadaUsuario.last_name}</h5>
  
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">${ porCadaUsuario.email}</li>
  <li class="list-group-item">Some quick example text to build on the card title and make up the bulk of the card's content.</li>
</ul>

</div>`  );
}
// [ "<div>...</div", "", "" ]; //Genera un arreglo de cards por cada Usuario
const imprimirCartasEnElHtml = ( arregloDeCartas ) => document.getElementById("user-cards").innerHTML= arregloDeCartas.join("");
                                              //  "<div>...</div" "" "" ;
getUsersUsingAsyncAwait(url);


const guardarDatosEnLocalStorage = (arregloDeUsuarios) => {
// Guardar en el Local Storage con la marca de tiempo
const timestamp = new Date().getTime();
const datosAGuardar = { usuarios: arregloDeUsuarios, hora: timestamp };
localStorage.setItem("PrimerRequest", JSON.stringify(datosAGuardar));
                                            
}
                                            
const obtenerDatosDeLocalStorage = () => {
                                                
//const url = "https://reqres.in/api/users?delay=3"
                                            
const datosDeLocalStorage = JSON.parse(localStorage.getItem("PrimerRequest")); //OBJETO
console.log(datosDeLocalStorage);
                                            
const horaActual = new Date().getTime();
console.log(horaActual);
                                            
if (datosDeLocalStorage === null){ //si es la primera vez que entramos a la pagina lo va a imprimir con url 
getUsersUsingAsyncAwait(url);
console.log("Creacion de cartas con URL ");
} else if(horaActual - datosDeLocalStorage.hora > 60000){ // si despues de entrar pasa un minuto nos lo va a imprimir con url y ademas nos va a borrar la primera instruccion para que nos pueda cumplir la funcion 
getUsersUsingAsyncAwait(url);
console.log("Creacion de cartas con URL");
localStorage.removeItem("PrimerRequest");
}else{
    imprimirCartasEnElHtml( crearCardsDeUsuarios(datosDeLocalStorage.usuarios) );
    console.log("Creacion de cartas con local storage"); //si no se cumple las dos opciones anteriores, se va a imprimir desde el local storage 
    }
                                              
}
                                        
obtenerDatosDeLocalStorage();