
// Función para calcular el pago mensual
function calcularPagoMensual() {
    // Obtener los valores de los campos de entrada y convertirlos a números
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, '')) || 0;
    let tasaInteresAnual = parseFloat(document.getElementById('inputTasaInteres').value.replace('%', '')) || 0;
    let plazoEnAnnos = parseInt(document.getElementById('inputPlazo').value) || 0;

    // Validar que haya algo en los valores de entrada
    if (isNaN(montoSolicitado) || isNaN(tasaInteresAnual) || isNaN(plazoEnAnnos)) {
        // Si algún valor no es válido, asignar 0 a todos los valores
        montoSolicitado = 0;
        tasaInteresAnual = 0;
        plazoEnAnnos = 0;
    }

    // Resto de tu código para calcular el pago mensual
    let tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    let plazoEnMeses = plazoEnAnnos * 12;
    let pagoMensual = (montoSolicitado * (tasaInteresMensual / 100) * Math.pow((1 + (tasaInteresMensual / 100)), plazoEnMeses) / (Math.pow((1 + (tasaInteresMensual / 100)), plazoEnMeses) - 1));

    // Asignar el resultado al valor del input
    document.getElementById('PagoMensual').value = pagoMensual.toFixed(2);

    return pagoMensual;
}

//Funcion para calcular el salario minimo
function calcularSalarioMinimo() {
    // Obtener los valores de los campos de entrada y convertirlos a números
    let pagoMensual = calcularPagoMensual();

    //Calculo de salario minimo
    let salarioMinimo = pagoMensual / 0.40;

    // Asignar el resultado al valor del input
    document.getElementById('SalarioMinimo').value = salarioMinimo.toFixed(2);
    
    return salarioMinimo;
}

function mostrarEtiquetas() {
    // Obtener los valores de los campos de entrada y convertirlos a números
    let salario = parseFloat(document.getElementById('inputSalarioNeto').value.replace(/[^0-9.]/g, '')) || 0;
    let valorVivienda = parseFloat(document.getElementById('inputValorVivienda').value.replace(/[^0-9.]/g, '')) || 0;
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, '')) || 0;
    let edadCliente = calcularEdad();
    let porcentajeFinanciado;
    let mensaje1;
    let mensaje2;

    // Validar que haya algo en los valores de entrada
    if (isNaN(salario)) {
        // Si algún valor no es válido, asignar 0 a salario
        salario = 0;
    }

    if (isNaN(valorVivienda)) {
        // Si algún valor no es válido, asignar 0 al valor de la vivienda
        valorVivienda = 0;
    }

    //Validacion de que el salario del cliente es mayor o igual al requerido
    if (salario >= calcularSalarioMinimo()) {
        mensaje1 = "Monto de salario suficiente para el crédito";
    } else {
        mensaje1 = "Monto de salario insuficiente";
    }

    //Validacion de que la edad del cliente es mayor o igual al requerido
    if (edadCliente >= 22 && edadCliente < 55) {
        mensaje2 = "Cliente con edad suficiente para crédito";
    } else {
        mensaje2 = "Cliente no califica para crédito por edad";
    }

    //Calculo del porcentaje a financial
    porcentajeFinanciado = valorVivienda / montoSolicitado;

    //Llamado para guardar y cargar los datos desde el local Storage
    cargarDatosDesdeLocalStorage();


    // Asignar el resultado a la etiqueta
    document.getElementById('salarioSuficiente').textContent = mensaje1;
    document.getElementById('edadSuficiente').textContent = mensaje2;
    document.getElementById('porcentajeFinanciado').textContent = "Porcentaje a financiar: " + porcentajeFinanciado + "%";

    return porcentajeFinanciado;
}

//Funcion para mostrar la primera tabla
function mostrarTabla() {
    // Obtener los valores del formulario
    let correoElectronico = document.getElementById('inputEmail').value;
    let nombre = document.getElementById('inputNombre').value;
    let fechaNacimiento = document.getElementById('inputFechaNacimiento').value;
    let salarioNeto = parseFloat(document.getElementById('inputSalarioNeto').value.replace(/[^0-9.]/g, ''));
    let tasaInteresAnual = parseFloat(document.getElementById('inputTasaInteres').value.replace('%', ''));
    let plazoEnAnnos = parseInt(document.getElementById('inputPlazo').value);
    let valorVivienda = parseFloat(document.getElementById('inputValorVivienda').value.replace(/[^0-9.]/g, ''));
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, ''));
    let porcentajeFinanciado = mostrarEtiquetas();
    let ingresoRequerido = calcularSalarioMinimo();

    // Cálculos
    let tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    let plazoEnMeses = plazoEnAnnos * 12;
    let pagoMensual = (montoSolicitado * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazoEnMeses));

    // Crear una tabla y agregar los datos
    let tablaHTML = '<h3>Credito Happy Earth</h3>';
    tablaHTML += '<table border="1">'
    tablaHTML += `<tr><td>Correo Electrónico</td><td>${correoElectronico}</td></tr>`
    tablaHTML += `<tr><td>Nombre</td><td>${nombre}</td></tr>`
    tablaHTML += `<tr><td>Fecha de Nacimiento</td><td>${fechaNacimiento}</td></tr>`
    tablaHTML += `<tr><td>Salario Neto Mensual</td><td>${salarioNeto}</td></tr>`
    tablaHTML += `<tr><td>Valor de la Vivienda</td><td>${valorVivienda}</td></tr>`
    tablaHTML += `<tr><td>Monto a Solicitar</td><td>${montoSolicitado}</td></tr>`
    tablaHTML += `<tr><td>Plazo en Años</td><td>${plazoEnAnnos}</td></tr>`
    tablaHTML += `<tr><td>Tasa de Interés Anual</td><td>${tasaInteresAnual}%</td></tr>`
    tablaHTML += `<tr><td>Cuota</td><td>${pagoMensual.toFixed(2)}</td></tr>`
    tablaHTML += `<tr><td>% a Financiar</td><td>${porcentajeFinanciado.toFixed(2)}%</td></tr>`
    tablaHTML += `<tr><td>Ingreso neto Requerido</td><td>${ingresoRequerido.toFixed(2)}</td></tr>`
    tablaHTML += '</table>';


    // Mostrar la tabla en el div con el id "tablaResultados"
    document.getElementById('tablaResultados').innerHTML = tablaHTML;
}

//Funcion para mostrar la tabla de proyección
function mostrarProyeccion() {
    // Obtener los valores del formulario
    let montoSolicitado = parseFloat(document.getElementById('inputMontoSolicitado').value.replace(/[^0-9.]/g, ''));
    let tasaInteresAnual = parseFloat(document.getElementById('inputTasaInteres').value.replace('%', ''));
    let plazoEnAnnos = parseInt(document.getElementById('inputPlazo').value);

    // Realizar los cálculos
    let tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    let plazoEnMeses = plazoEnAnnos * 12;
    let pagoMensual = (montoSolicitado * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazoEnMeses));

    // Crear una tabla de proyección
    let tablaProyeccionHTML = '<h2>Proyección de Pagos</h2>';
    tablaProyeccionHTML += '<table border="1">';
    tablaProyeccionHTML += '<tr><th>Mes</th><th>Pago Mensual</th><th>Intereses</th><th>Amortización</th><th>Saldo por Mes</th></tr>';

    // Inicializar el saldo inicial al monto solicitado
    let saldoMesAnterior = montoSolicitado;

    for (let mes = 1; mes <= plazoEnMeses; mes++) {
        // Calcular los intereses
        let intereses = vInteres(tasaInteresMensual, mes, pagoMensual, montoSolicitado);

        // Calcular la amortización
        let amortizacion = pagoMensual - intereses;

        // Calcular el saldo por mes
        let saldoMes = saldoMesAnterior - amortizacion;

        // Actualizar el saldo para el próximo mes
        saldoMesAnterior = saldoMes;

        // Agregar la fila a la tabla de proyección
        tablaProyeccionHTML += `<tr><td>${mes}</td><td>${pagoMensual.toFixed(2)}</td><td>${intereses.toFixed(2)}</td><td>${amortizacion.toFixed(2)}</td><td>${saldoMes.toFixed(2)}</td></tr>`;
    }

    tablaProyeccionHTML += '</table>';

    // Mostrar la tabla de proyección en el div con el id "tablaProyeccion"
    document.getElementById('tablaProyeccion').innerHTML = tablaProyeccionHTML;
}

//Funcion para calcular la edad con la fecha de nacimiento
function calcularEdad() {
    // Obtener la fecha de nacimiento del campo de entrada
    let fechaNacimiento = document.getElementById('inputFechaNacimiento').value;

    // Convertir la fecha de nacimiento a un objeto de fecha
    let OfechaNacimiento= new Date(fechaNacimiento);

    // Obtener la fecha actual
    let fechaActual = new Date();

    // Calcular la diferencia entre la fecha actual y la fecha de nacimiento
    let diferencia = fechaActual - OfechaNacimiento;

    // Convertir la diferencia a años. Se usa math.floor para redondear hacia abajo 
    let edad = Math.floor(diferencia / (365.25 * 24 * 60 * 60 * 1000));

    return edad;
}

//Funcion para calcular los intereses
function vInteres(tasaMensual, mes, pagoMensual, montoSolicitado){
    var vInteres = 0;
    var amortiza = montoSolicitado;

    for (var i = 1; i <= mes; i++) {
        vInteres = (amortiza * (tasaMensual / 100));
        amortiza = amortiza - (pagoMensual - vInteres);
        
    }

    return vInteres;
}

function cargarDatosDesdeLocalStorage() {
    let inputEmail = document.getElementById('inputEmail');
    let inputNombre = document.getElementById('inputNombre');
    let inputFechaNacimiento = document.getElementById('inputFechaNacimiento');
    let inputSalarioNeto = document.getElementById('inputSalarioNeto');
    let inputTasaInteres = document.getElementById('inputTasaInteres');
    let inputPlazo = document.getElementById('inputPlazo');
    let inputValorVivienda = document.getElementById('inputValorVivienda');
    let inputMontoSolicitado = document.getElementById('inputMontoSolicitado');
  
    inputEmail.value = localStorage.getItem('inputEmail') || '';
    inputNombre.value = localStorage.getItem('inputNombre') || '';
    inputFechaNacimiento.value = localStorage.getItem('inputFechaNacimiento') || '';
    inputSalarioNeto.value = localStorage.getItem('inputSalarioNeto') || '';
    inputTasaInteres.value = localStorage.getItem('inputTasaInteres') || '7.10%';
    inputPlazo.value = localStorage.getItem('inputPlazo') || '';
    inputValorVivienda.value = localStorage.getItem('inputValorVivienda') || '';
    inputMontoSolicitado.value = localStorage.getItem('inputMontoSolicitado') || '';
  
    inputEmail.addEventListener('input', function () {
      localStorage.setItem('inputEmail', inputEmail.value);
    });
  
    inputNombre.addEventListener('input', function () {
      localStorage.setItem('inputNombre', inputNombre.value);
    });
  
    inputFechaNacimiento.addEventListener('input', function () {
      localStorage.setItem('inputFechaNacimiento', inputFechaNacimiento.value);
    });
  
    inputSalarioNeto.addEventListener('input', function () {
      localStorage.setItem('inputSalarioNeto', inputSalarioNeto.value);
    });
  
    inputTasaInteres.addEventListener('input', function () {
      localStorage.setItem('inputTasaInteres', inputTasaInteres.value);
    });
  
    inputPlazo.addEventListener('input', function () {
      localStorage.setItem('inputPlazo', inputPlazo.value);
    });
  
    inputValorVivienda.addEventListener('input', function () {
      localStorage.setItem('inputValorVivienda', inputValorVivienda.value);
    });
  
    inputMontoSolicitado.addEventListener('input', function () {
      localStorage.setItem('inputMontoSolicitado', inputMontoSolicitado.value);
    });
  }
  //Necesario para que se ejecute después de que el DOM esté completamente cargado.
  document.addEventListener('DOMContentLoaded', cargarDatosDesdeLocalStorage);

//-------------------------------------------------------------------------
//Permite que se muestre el valor del range para el plazo en años
$(document).ready(function(){
    $("#inputPlazo").on("input", function(){
        // Obtiene el valor actual del rango
        var valorActual = $(this).val();
        // Actualiza el elemento HTML con el valor actual
        $("#valorPlazo").text(valorActual);
    });
});