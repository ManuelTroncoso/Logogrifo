let allLetra = Array();
let mil = 0;
let sec = 0;
let mint = 0;
let control;
$(function () {
    ConnectaAjax("palabras.json");
});


//Funcion a la que le pasas el nombre de un archivo y atraves de
//AJAX te lo transforma en un json con los datos que contenga.
function ConnectaAjax(archivo) {
    $.ajax({
        url: archivo,
        method: "get",
        dataType: "json",
        //async: false,
        success: function (a) {

            CreaLogogrifo(a, EnumLetra(a));
        }

    });
}

//Esta funcion te crea el logogrifo visualmente.
function CreaLogogrifo(palabras, allLetra) {
    mil = 0;
    sec = 0;
    mint = 0;
    $('#mint').text('00:')
    $('#sec').text('00')
    $('#mil').text('00')
    control = setInterval('time()', 10);
    for (let filas = 0; filas < 7; filas++) {
        //Primer for para crear las filas.
        $("#all").append('<div class="row" id="row' + filas + '">');
        for (let i = 0; i < 10 - filas; i++) {
            //Segundo for para crear los cuadrados donde iran las letras
            let valor = EscribeNum(palabras[filas].palabra[i]);
            $("#row" + filas).append('<p>'+valor + '</p><input onchange="EscribeAll(' + valor + ', this.value)" type="text" class="n' + valor + '" name="" id="" maxlength="1">');
        }
        //Añade la descripción
        $("#all").append('<div class=row"><p> ' + palabras[filas].descripcion + ' </p></div> </div> ');
    }

}


//Enumera las letras
function EnumLetra(palabras) {
    let letras = Array();
    //Creo el primer array para separar las palabras de una en una en letra por letra
    for (let i = 0; i < palabras.length; i++) {
        letras = (palabras[i].palabra).split("");
        //segundo array para comparar si contengo esa letra en un array
        //donde guardo todas las letras. si no tengo esa letra se guarda en allLetra.
        for (let j = 0; j < letras.length; j++) {
            if ($.inArray(letras[j], allLetra) == -1) {
                allLetra.push(letras[j]);
            }
        }
    }
    return allLetra;
}

//Saca el valor de la letra.
function EscribeNum(letra) {
    //console.log(allLetra)
    return 1 + ($.inArray(letra, allLetra));

}

//Escribe la misma letra en los cuadrados corresponndiente.
function EscribeAll(valor, texto) {

    $('.n' + valor).each(function () {
        $(this).val(texto)
    })
}

//Comprueba palabras
function CompruebaPalabras() {
    let todas = true;
    clearInterval(control)
    for (let i = 0; i < allLetra.length; i++) {
        if ($('.n' + (i + 1)).val() != allLetra[i]) {
            $('.n' + (i + 1)).addClass("error")
            todas = false;

        }
        else {
            $('.n' + (i + 1)).addClass("correcto")
        }
        $('.n' + (i + 1)).prop("disabled", true)
    }
    $('#comprueba').css('display', 'none');
    $('#reintentar').css('display', 'block');
    
    if(todas ==  true){
        alert("!Has ganado Felicidades¡")
    }
    else{
        alert("Vamos que tu puedes")
    }

}


function JuegadeNuevo() {


    for (let i = 0; i <= allLetra.length; i++) {
        $('.n' + i).each(function () {
            $(this).val("")
            $('.n' + (i)).removeAttr("disabled");
            $('.n' + (i)).removeClass("correcto")
            $('.n' + (i)).removeClass("error")
        })
    }
    mil = 0;
    sec = 0;
    mint = 0;
    $('#mint').text('00:')
    $('#sec').text('00')
    $('#mil').text('00')
    control = setInterval('time()', 10);
   


    $('#comprueba').css('display', 'block');
    $('#reintentar').css('display', 'none');
}


// function explode(){
//     setTimeout(explode, 15000);
//     alert("Se acabo el tiempo!");
//     CompruebaPalabras();
// }


function time() {
    mil = mil + 1;
    document.getElementById('mil').innerHTML = ':' + mil;
    if (mil == 99) {
        mil = 0;
        sec = sec + 1;
        document.getElementById('sec').innerHTML = sec;
        if (sec == 60) {
            sec = 0;
            document.getElementById('sec').innerHTML = sec;
            mint = mint + 1;
            document.getElementById('mint').innerHTML = mint + ":";
        }
    }

}