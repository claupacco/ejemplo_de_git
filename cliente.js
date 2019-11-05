const inquirer = require ("inquirer");

const rutaArchivo = __dirname + "/pedidos.json"

let pedidos = fs.readFileSync(rutaArchivo, {encoding: "utf8"})

pedidos = JSON.parse(pedidos)


let opciones = [

    {
        name: "nombre",
        type: "imput",
        message: "ingresa tu nombre", 
    },
    {
        name: "telefono",
        type: "imput",
        message: "ingresa tu numero de telefono",
    },
    {
        name: "gusto",
        type: "rawlist" ,
        message: "elegi el gusto de la pizza",
        choices: ["Muzzarella", "Jamon y Morron", "Calabresa", "4 Quesos"],
    },{
        name: "tamañoDeLaPizza",
        type: "list",
        message: "elegi el tamaño de la pizza",
        choices: ["Personal", "Mediana", "Grande"],

    },
    {
        name: "conBebida",
        type: "confirm",
        default: false        
    },
    {
        name: "gustoDeLaBebida",
        type: "list",
        message: "elige el gusto de la bebida",
        choices: ["Coca Cola", "Seven Up", "Naranja", "Pomelo"],
        when: function (respuesta){
            return respuesta.conBebida
    }
},
    {
        name: "gustoDeEmpanada",
        type: "checkbox",
        message: "elige el gusto de la empanada",
        choices: ["carne", "pollo", "atun", "choclo", "calabresa", "4 quesos"],

    },
    {
        name: "paraLlevar",
        type: "confirm",
        message: "La pizza es para llevar?",
        default: false,
    },
    {
        name: "direccion",
        type: "imput",
        message: "ingresa tu direccion",
        when: function (respuestas){
            return respuestas.paraLlevar
        },
        validate: function (respuesta){
            if(respuesta.length <5){
                return "Dejanos saber tu direccion para enviarte la pizza"
            }
            return true 
        }
   }, 
    {
        name: "clienteHabitual",
        type: "confirm",
        default: false
   }
]
let obtenerDescuento = (tamañoDeLaPizza, conBebida, fnLista) =>{
    if (!conBebida){
        return 0
    }
    let descuentos = fnListas()
    return descuentos[tamaño]
}

inquirer.prompt(opciones)

.then(function (respuestas){
    console.log (respuestas)
    console.log("=== Resumen de tu pedido ===")
    console.log("Tus datos son - Nombre: " + respuestas.nombre + "/ Teléfono: " + respuestas.telefono )
   
    let precioDelivery = 0;

    if (respuestas.paraLlevar){
        precioDelivery = 20;
      console.log("Tu pedido será entregado en: " + respuestas.direccion)
    } else {
      console.log ("Nos indicaste que pasarás a retirar tu pedido")
    }
    console.log("=== Productos solicitados ===")
    console.log("Pizza: " + respuestas.gusto)
    console.log("Tamaño: " + respuestas.tamañoDeLaPizza)

    let precioBebida = 0

    if (respuestas.conBebida){
        precioBebida = 80;
        console.log ("Bebida: " + respuestas.gustoDeLaBebida)
    }

    if (respuestas.clienteHabitual){
    console.log("Tus tres empanadas de regalo serán de: " )
    console.log("Choclo")
    console.log("Carne")
    console.log("Atun")
    }

    let precioPizza = obtenerPrecioPizza(respuestas.tamaño);
    let descuento = obtenerDescuento(respuestas.tamaño, respuestasConBebida,listaDeDescuento);

    console.log("El descuento es de " + descuento + "%")
    console.log ("Total delivery: " + precioDelivery)
    
    
    let subtotal = precioPizza + precioBebida
    let descuentoFinal = (subtotal + descuento) / 100

    console.log("Subtotal: " + subtotal);
    console.log("Descuento" + descuentoFinal)
    console.log("Total" + precioFinal)


    let fechadelpedido = new Date;
        
    let nuevos = {
        fecha:fechaDelPedido.toLocaleDateString("en-US", {"hours12": true
    }), 

        hora:fechaDelPedido.toLocaleTimeString("en-US", {"hours12": true}),

    }
    let final = {
    ...respuestas,
    ...nuevos,
    totalProductos: precioFinal,
    descuento: descuentoFinal,
    id: pedidos.length == 0 ? 1 : ++pedidos.length
    
}
    pedidos.push(final)

    pedidos = JSON.stringify(pedidos)

    fs.writeFileSync(rutaArchivo, pedidos)

})