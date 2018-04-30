// PARA MANIPULAR EL DOM
var $$ = Dom7;

//JSON: datosJSON es como viene la informacion, todo como un string
//var datosJSON = "[{"id":"TURISMO","categoria":"T","sinleer":0,"suscripto":true,"tipo":null,"fecupd":"2017-07-19T19:07:13.253","xbaja":false},{"id":"AGROINFORMES","categoria":"A","sinleer":1,"suscripto":true,"tipo":null,"fecupd":"2017-12-19T09:15:58","xbaja":true},{"id":"PROMOCION","categoria":"P","sinleer":0,"suscripto":true,"tipo":null,"fecupd":"2017-07-19T19:07:13.253","xbaja":false}]";
//Pero hay que pasarlo como un array para trabajarlo
//localcategorias = JSON.parse(jsonNotificaciones);
var arrayCategoria = [
{ id:"T",categoria: "TURISMO",sinleer:0,"suscripto":true,"tipo":null,"fecupd":"2017-07-19T19:07:13.253","xbaja":false},
{ id:"A",categoria: "AGROINFORMES",sinleer:1,"suscripto":true,"tipo":null,"fecupd":"2017-12-19T09:15:58","xbaja":true},
{ id:"P",categoria:"PROMOCION",sinleer:0,"suscripto":true,"tipo":null,"fecupd":"2017-08-19T19:07:13.253","xbaja":false}
];


var arrayNotificaciones = JSON.parse(jsonNotificaciones);

var vm = ko.observableArray([]);
var localCategorias;
var idCategoriaLocal; //guardo la categoria que tengo que mostrar
var localSeats;
var bCargado = "false";



function setNotificacion(cargado,id,titulo,subtitulo,descri,empresa,feccre,leida,foto) {
    var self = this;
    if (cargado==""){ self.cargado = null } else self.cargado = cargado; //para controlar que no cargue infitina veces el array
    if (id==""){ self.id = null } else self.id = id;
    if (titulo==""){ self.titulo = null } else self.titulo = titulo;
    if (subtitulo==""){ self.subtitulo = null } else self.subtitulo = subtitulo;
    if (descri==""){ self.descri = null } else self.descri= descri;
    if (empresa==""){ self.empresa = null } else self.empresa = empresa;
    if (feccre==""){ self.feccre = null } else self.feccre = feccre;
    if (leida==""){ self.leida = 0 } else self.leida = leida;
    if (foto==""){ self.foto = 0 } else self.foto = foto;
}

function AlertaViewModel() {
    

    len = arrayNotificaciones.length;
    for (var i = 0; i <= len -1; i++) {
        if (self.seats== null && i==0){
            self.seats = ko.observableArray([
                new setNotificacion(bCargado,arrayNotificaciones[i].id,arrayNotificaciones[i].titulo,arrayNotificaciones[i].subtitulo,arrayNotificaciones[i].descri,arrayNotificaciones[i].empresa,
            arrayNotificaciones[i].feccre,arrayNotificaciones[i].leida,arrayNotificaciones[i].foto)
            ]);
        }
        else
        {
            self.seats.push(new setNotificacion(bCargado,arrayNotificaciones[i].id,arrayNotificaciones[i].titulo,arrayNotificaciones[i].subtitulo,arrayNotificaciones[i].descri,arrayNotificaciones[i].empresa,
            arrayNotificaciones[i].feccre,arrayNotificaciones[i].leida,arrayNotificaciones[i].foto));
            //console.log(i);
        }
    }

    // Operations
    self.addSeat = function() {
        self.seats.push(new setNotificacion("false",arrayNotificaciones[0].id,arrayNotificaciones[0].titulo,arrayNotificaciones[0].subtitulo,arrayNotificaciones[0].descri,arrayNotificaciones[0].empresa,
            arrayNotificaciones[0].feccre,arrayNotificaciones[0].leida,arrayNotificaciones[i].foto));



    }
    
    //REMOVE
    //self.seats.removeAll();


    //PARA HACER USO DEL ARRAY, guardarlo como funcion()
    localSeats = self.seats();

}





function cargarListado(){

    //es mas facil hacer uso del array en html con foreach: arrayCategorias
    //CargarCateogrias();
    //buscarCategoriaSeleccionada();
    //limpiarSeleccionCategoria();
    //cualFue();
    //vm.brickInfos(arrayNotificaciones.reverse());
    

    //ko.applyBindings(new AlertaViewModel());
    //ko.applyBindings({}, document.getElementById('liCategoria'));
    ko.applyBindings(AlertaViewModel(), document.getElementById('ulNotificaciones'));
    bCargado=true;

    
}

/*
function CargarCateogrias(){
    //es mas facil hacer uso del array en html con foreach: arrayCategorias
    var len = arrayCategoria.length;
    for (var i = 0; i <= arrayCategoria.length-1; i++) {
        if (i==0){ //&& arrayCategoria[i].id!="P"){
            //hay que definir la estrcutura de los atributos del html como un objeto para manipularlos como quieras
            localCategorias = [{
                nombre : arrayCategoria[i].categoria,
                id : arrayCategoria[i].id,
                fecupd: arrayCategoria[i].fecupd,
                //fecupd : "javascript: filtrarCategoria('"+localcategorias[i].id+"'); $('#wrapper').toggleClass('toggled');",
                xbaja : arrayCategoria[i].xbaja,
                titulo: arrayCategoria[i].id + " - " + arrayCategoria[i].categoria
            }];
            this.firstname = arrayCategoria[i].categoria;
        }else {
            localCategorias.push({
                nombre : arrayCategoria[i].categoria,
                id : arrayCategoria[i].id,
                fecupd: arrayCategoria[i].fecupd,
                //fecupd : "javascript: filtrarCategoria('"+localcategorias[i].id+"'); $('#wrapper').toggleClass('toggled');",
                xbaja : arrayCategoria[i].xbaja,
                titulo: arrayCategoria[i].id + " - " + arrayCategoria[i].categoria
            }); 
        }
    }

}
*/

function setCategoria(codigo,nombre){
    this.codigo= ko.observable(codigo);
    this.nombre= ko.observable(nombre);
    /*this.categoriaOpciones = ko.computed(function() {
        return this.codigo() + " - " + this.nombre();    
    }, this);*/
    this.categoriaOpciones = this.codigo() + " - " + this.nombre();
    return categoriaOpciones;
}


function buscarCategoriaSeleccionada(){

for (i = 0; i <= liCategoria.getElementsByClassName("inputCategoria").length-1; i++) {
    if (liCategoria.getElementsByClassName("inputCategoria")[i].checked ==true)
    {
        idCategoriaLocal =  liCategoria.getElementsByClassName("divCategoria")[i].innerHTML.substring(0,1) ;
    }
}
}

function limpiarSeleccionCategoria (){

    for (i = 0; i <= liCategoria.getElementsByClassName("inputCategoria").length-1; i++) {
        //checked="checked"
        liCategoria.getElementsByClassName("inputCategoria")[i].removeAttribute("checked");
    }

}

function cualFue(){
        //$('#ulNotificaciones').click(function(e){
         var id = e.target.id;
         console.log(id);

        //});
}



function visiblePopup1(){
    var popup = document.getElementsByClassName("col button button-fill color-green")[0];
    //var popup = $$(".col button button-fill color-green");
    popup.setAttribute("class","col button color-green");
    //popup.removeClass('col button button-fill color-green').addClass('col button color-green');
    console.log(popup);

        $$('.left').on('click', function (e) {
            //console.log($$(this).attr('html'));
            e.target.setAttribute("class","col button button-fill color-green");
            console.log (e.target);
            /*
            tag = e.target.tagName;
            parentNode = e.target;
            console.log("TAG >>> " + tag);
            console.log ("parentNode >>> " + parentNode);
            console.log (parentNode);
            console.log ("Padre >>>")
            console .log($$(e.target).parent()[0]);
            console .log($$($$(e.target).parent()[0]).parent()[0]);
            console.log("HIJO >>>")
            console .log($$($$(e.target).parent()[0]).parent()[0].firstChild);
            hijo = $$($$(e.target).parent()[0]).parent()[0].childNodes[0].nodeClass;
           
            console.log(hijo);
            element = document.getElementById(tag);
            console.log ("element >>> " + element);
            //falta obtenr if checked == true*/
        });


}

function hiddenPopup(){
    var popup = document.getElementById("myPopup3");
    popup.setAttribute("class","spanPopup");
    console.log("clickeado")
}

/*$$('item-link item-content').click(function(e){
        var id = e.target.id;
        console.log(id);

});*/
