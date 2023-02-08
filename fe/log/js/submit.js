
    // let cliente = document.getElementById('name').value;
    // let telefono = document.getElementById('tel').value;
    // let delivery = document.getElementById('delivery').value;
    // let lugar = document.getElementById('lugar').value;
    // let retiro = document.getElementById('retiro').value;
    // let pedido = actualizarCarrito().value;
    // let entrega = document.getElementById('form-delivery').value;
// boton deliverys


function isMobile() {
    if (sessionStorage.desktop)
        return false;
    else if (localStorage.mobile)
        return true;
    var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var i in mobile)
        if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
    return false;
}


const formulario = document.querySelector('#formulario');
const buttonSubmit = document.querySelector('#submit');
const urlDesktop = 'https://api.whatsapp.com/';
const urlMobile = 'whatsapp://';
const telefono = '3772430213';



formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    
    setTimeout(() => {
        let cliente = document.getElementById('name').value;
        let celular = document.getElementById('tel').value;
        
        let retiro = document.getElementsByTagName('label').value;
        let lugar = document.getElementsByTagName('input[type="number"]').value;
        let entrega = document.getElementsByTagName('input[type="text"]').value;

        // if(entrega.value.length == 0|| entrega.value.length == null || entrega.value.length == 'undefined'){
        //     document.getElementById('direccion').value = 0
        // }else{
        //     document.getElementById('direccion').value
        // }

        // if(lugar.value.length == 0 || lugar.value.length == null || lugar.value.length == 'undefined'){
        //     document.getElementById('mesa').value = 0
        // }else{
        //     document.getElementById('mesa').value
        // }

        
        //---------------------------
        let show = JSON.stringify(contenedorCarrito.innerHTML = carrito.map((prod) => prod.cantidad + " " + prod.nombre+ " " + "$"+ prod.precio));
        let totalPrecio = JSON.stringify(precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0));
        
        //---------------------------
        let mensaje = 'send?phone=' + telefono + 
        '&text=*_Pedidos_*%0A*Nombre*:' + cliente + 
        '%0A%0A*//Opciones de Envio//*%0A' + 
        '%0A*Retiras*:' + retiro +
        '%0A*Direccion*:' + entrega +
        '%0A*Consumis en el lugar*:' + lugar + 
        '%0A%0A*//Contacto//*%0A' + 
        '%0A*Celular*%0A' + celular +
        '%0A%0A*_Mi pedido es_*%0A' + show
        + '%0A%0A' + '%0A*Precio Total*:' + '*$' + totalPrecio + '*';
        
        //---------------------------
        if(isMobile()) {
            window.open(urlMobile + mensaje, '_blank')
        }else{
            window.open(urlDesktop + mensaje, '_blank')
        }
    }, 3000);
});