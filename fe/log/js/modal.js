// modal carrito
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
// formulario
const contenedorForm = document.getElementById('form-container')
const abrirForm = document.getElementById('go-pay')
const cerrarForm = document.querySelector('.cerrar-form')
const modalForm = document.getElementsByClassName('manage-order')[0]
const formDelivery = document.getElementById('form-delivery')
// OPCIONES ENTREGA
const delivery = document.getElementById('delivery')
const retiro = document.getElementById('retiro')
const lugar = document.getElementById('lugar')

//MODAL CARRITO

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
function btnCerrar(){
        contenedorModal.classList.toggle('modal-active');
}

contenedorModal.addEventListener('click', () =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})

//MODAL FORM

abrirForm.addEventListener('click', ()=>{
    contenedorForm.classList.toggle('form-active')
    btnCerrar();
})

cerrarForm.addEventListener('click', ()=> {
    contenedorForm.classList.toggle('form-active')
    displayProducts()
})

contenedorForm.addEventListener('click', (event) =>{
    contenedorForm.classList.toggle('modal-active')

})


//MODAL OPCIONES DE ENTREGAS



delivery.addEventListener('click', (e) => {
    


    deliveryHTML= ` 
    <label for="direccion">Direccion</label><br>
    <input type="text" name="direccion" id="direccion" class="form-control" value="" required>`;
    document.getElementById('form-delivery').innerHTML= deliveryHTML
})


retiro.addEventListener('click', () => {
    retiroHTML= `
    <label for="retira" id="retira"><b>Muchas gracias por tu confianza!</b></label><br>
    
`;
    document.getElementById('form-delivery').innerHTML= retiroHTML
})


lugar.addEventListener('click', (e) => {
    
    lugarHTML= `
    <label for="mesa">En que mesa estas?</label><br>
    <input type="number" name="mesa" id="mesa" class="form-control" value="" required>
    `;
    document.getElementById('form-delivery').innerHTML= lugarHTML
})



