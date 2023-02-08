	const contenedorProductos = document.getElementById('contenedor-productos');
	const contenedorCarrito = document.getElementById('carrito-contenedor');
	const botonVaciar = document.getElementById('vaciar-carrito');
	const contadorCarrito = document.getElementById('contadorCarrito')
	const cantidad = document.getElementById('cantidad')
	const precioTotal = document.getElementById('precioTotal')
	const cantidadTotal = document.getElementById('cantidadTotal')
	let carrito = [];
	let productsList = [];
	let order = {
		items: []
	};
	
	async function pay(){
		const productsList = await (await fetch("/api/pay",{
			method: "POST",
			body: JSON.stringify(carrito),
			headers: {
				"Content-Type": "application/json",
			}
		})).json();
	// window.alert(products.join(", \n"))
	}



	botonVaciar.addEventListener('click', () => {
		carrito.length = 0;
		actualizarCarrito()
	})

	// async function delivery(){
	// 	delivery.innerHTML='';
	// 	opEntrega.forEach(deli => {
	// 		const div = document.createElement('div')
	// 		div.className = ('form-group')
	// 		div.innerHTML = `
	// 		<label for="tel">Tu Direccion</label><br>
	// 		<input type="text" name="tel" id="tel" class="form-control" value="" required autocomplete="on">
	// 		`
			
	// 	})
	// 	document.getElementById('manage-order').innerHTML= delivery.innerHTML
	// }

	function showOrder(){
		document.getElementById('page-content').style.display= "none";
		document.getElementById('form-container').style.display= "flex";
		

		let orderHTML = '';

		carrito.forEach(order => { 
			
			orderHTML +=`
			
			<div class="order-content" id="order-content">
					<p><b>${order.nombre}</b></p>

					<p>precio$${order.precio} x${order.cantidad}</p>
			</div>
		`
		})
		document.getElementById('show-order').innerHTML = orderHTML;
	}

	function displayProducts(){
		
		
		document.getElementById('page-content').style.display= "flex";
		document.getElementById('form-container').style.display= "none";
	
		let productsHTML = '';
		
		productsList.forEach(p => {
			let buttonHTML =  `<button id="agregar${p.id}" class="btn" onclick="agregarAlCarrito(${p.id});">Agregar</button>`;
			
			if(p.stock <= 0){
				buttonHTML =  `<button disabled id="agregar${p.id}" class="btn diseabled" onclick="agregarAlCarrito(${p.id});">Sin Stock</button>`;
			}
			
			productsHTML += `
			<div class="producto">	
			<div class="card">
				<div class="tools">
					<div class="circle">
					<span class="red box"></span>
					</div>
					<div class="circle">
					<span class="yellow box"></span>
					</div>
					<div class="circle">
					<span class="green box"></span>
					</div>
				</div>
				<div class="card__content">
					<img src=${p.img} alt="">
						<h3>${p.nombre}</h3>
							<p class="precioProducto">Precio:$ ${p.precio}</p>
								${buttonHTML}
				</div>
				</div>
			</div>
			
			`
		})
			document.getElementById('page-content').innerHTML = productsHTML;
	}


	const agregarAlCarrito = (prodId) => {

		const product = productsList.find(p => p.id === prodId);
        product.stock--;
		

		//PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
		const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
	
		if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
			const prod = carrito.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
				// map encuentre cual es el q igual al que está agregado, le suma la cantidad
				if (prod.id === prodId){
					prod.cantidad++
				}
			})
		} else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
			const item = productsList.find((prod) => prod.id === prodId)//Trabajamos con las ID
			//Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
			carrito.push(item)
		}
		//Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
		//el carrito y se ve.
		actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
		//MODIFICA EL CARRITO
		
	}

	

	const eliminarDelCarrito = (prodId) => {
		const item = carrito.find((prod) => prod.id === prodId)
		const indice = carrito.indexOf(item)
		carrito.splice(indice, 1)
		actualizarCarrito()
		console.log(carrito)
	}

	const actualizarCarrito = () => {

		contenedorCarrito.innerHTML = ""

		carrito.forEach((prod) => {
			const div = document.createElement('div')
			div.className = ('productoEnCarrito')
			div.innerHTML = `
			<img src=${prod.img} class="img-prod" alt="">
				<p><b>${prod.nombre}</b></p>|
					<p><b>Precio:</b> | $${prod.precio}</p>|
						<p><b>Cantidad:</b> 
							<span id="Cantidad">| ${prod.cantidad}</span></p>
								<button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
			`

			contenedorCarrito.appendChild(div);
			localStorage.setItem('carrito', JSON.stringify(carrito));
		})
		contadorCarrito.innerText = carrito.length;
		precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
	}

	window.onload = async() => {
		productsList = await (await fetch("/api/products")).json();
		console.log(productsList);
		displayProducts();
	}

	

	