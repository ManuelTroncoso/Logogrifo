
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
        success: function (a) {
            CreaLogogrifo(a, EnumLetra(a));
        }

    });
}

//Esta funcion te crea el logogrifo visualmente.
function CreaLogogrifo(palabras, allLetra) {
    for (let filas = 0; filas < 7; filas++) {
        //Primer for para crear las filas.
        $("#all").append('<div class="row" id="row' + filas + '">');
        for (let i = 0; i < 10 - filas; i++) {
            //Segundo for para crear los cuadrados donde iran las letras
            let valor = EscribeNum(palabras[filas].palabra[i], allLetra);
            $("#row" + filas).append(valor+'<input onchange="EscribeAll('+valor+', this.value)" type="text" class="n'+valor+'" name="" id="" maxlength="1">');
        }
        //Añade la descripción
        $("#all").append('<div class=row"> ' + palabras[filas].descripcion + ' </div> </div> ');
    }
}


//Enumera las letras
function EnumLetra(palabras) {
    let letras = Array();
    let allLetra= Array();
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
function EscribeNum(letra, allLetra){
    return 1+($.inArray(letra, allLetra));
}

function EscribeAll(valor, texto){
    
    $('.n'+valor).each(function(){
        $(this).val(texto)
    })
}
