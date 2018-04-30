//VARIABLES
var jsonNotificaciones = '[{"cargado":"false","id":"116fa960c1c74c788fc087c6e4c6710d","titulo":"ExpoAgro 2018","estado":"1","categoria":"AGROINFORMES","idcategoria":"A","descri":"La exposición agroindustrial a campo abierto más importante de la Argentina","empresa":"BITMOBILE","fecha":"19-12-2017 9:15","link":"","subtitulo":"La exposición agroindustrial a campo abierto más importante de la Argentina","usuario":null,"feccre":"2017-12-19T09:15:58","fecupd":"2017-12-19T09:15:58","foto":"img/camara.jpg","encuesta":null,"leida":2},{"id":"126fa960c1c74c788fc087c6e4c6710d","titulo":"Economias Regionales","estado":"1","categoria":"AGROINFORMES","idcategoria":"A","descri":"De los productores en crisis por la baja productividad","empresa":"MZ MATIAS","fecha":"19-12-2017 9:15","link":"","subtitulo":"De los productores en crisis por la baja productividad","usuario":null,"feccre":"2017-10-19T09:15:58","fecupd":"2017-10-19T09:15:58","foto":"img/campo.jpg","encuesta":null,"leida":1},{"id":"136fa96011c74c788fc087c6e4c6710d","titulo":"Agroactiva","estado":"1","categoria":"PROMOCION","idcategoria":"P","descri":"La exposición más importante de la Argentina","empresa":"AD ANDREA","fecha":"19-12-2017 9:15","link":"","subtitulo":"La exposición más importante de la Argentina","usuario":null,"feccre":"2017-09-19T09:15:58","fecupd":"2017-09-19T09:15:58","foto":"img/firma.jpg","encuesta":null,"leida":5},{"id":"146fa960c1c74c788fc037c6e4c6710d","titulo":"SAP FIORI","estado":"1","categoria":"PROMOCION","idcategoria":"P","descri":"SAP Fiori 2.0 is the latest evolution of the user experience for SAP S/4HANA. The user-centered design concept focuses on the way employees work and offers a variety of business benefits","empresa":"MZ MATIAS","fecha":"19-12-2017 9:15","link":"","subtitulo":"Reimagine the SAP user experience with SAP Fiori","usuario":null,"feccre":"2018-26-19T09:15:58","fecupd":"2018-26-19T09:15:58","foto":"img/sapfiori.png","encuesta":null,"leida":5},{"id":"156fa960c1c74c788fc037c6e4c6710d","titulo":"AgroNegocios","estado":"1","categoria":"PROMOCION","idcategoria":"P","descri":"En la cadena de los agronegocios, sin duda la digitalización es una herramienta y como tal la adopción temprana se conviertes en una ventaja competitiva La capacidad de gestionar y utilizar la información para predecir situaciones hoy es uno de los factores principales del negocio, al igual que la conexión inmediata con proveedores y clientes. ","empresa":"BIT SA","fecha":"19-12-2017 9:15","link":"","subtitulo":"La digitalización facilita y mejora la rentabilidad del negocio.","usuario":null,"feccre":"2018-26-19T09:15:58","fecupd":"2018-26-19T09:15:58","foto":"img/agronegocios.png","encuesta":null,"leida":5},{"id":"166fa960c1c74c788fc037c6e4c6710d","titulo":"SAP Run Simple","estado":"1","categoria":"PROMOCION","idcategoria":"P","descri":"Para alcanzar todas las oportunidades, las PyMEs deben de considerar la inclusión de la tecnología en la nube debido a las ventajas que ésta les ofrece.","empresa":"SAP","fecha":"19-12-2017 9:15","link":"","subtitulo":"Ventajas de la tecnología en la nube","usuario":null,"feccre":"2018-26-19T09:15:58","fecupd":"2018-26-19T09:15:58","foto":"img/sapcloud.png","encuesta":null,"leida":5}]';

var idEvento;



function inicializarF7(){
    // INICIALIZAR APP - VALORES QUE SE LE PUEDEN AGREGAR AL OBJETO https://v1.framework7.io/docs/init-app.html
    var myApp = new Framework7({
        //modalTitle: 'Confirma che!'

        //loadPage: 'login.html'

        /*preroute: function (view, options) {
            //view.router.loadPage('about.html'); //load another page with auth form
            if (!userLoggedIn) {
                view.router.loadPage('auth.html'); //load another page with auth form
                return false; //required to prevent default router action
            }
        }*/
    });

    // PARA MANIPULAR EL DOM
    var $$ = Dom7;

    // AGREGAR VISTA
    var mainView = myApp.addView('.view-main', {
        // Because we want to use dynamic navbar, we need to enable it for this view:
        dynamicNavbar: true
        //domCache: true //Activamos el DOM cache, para paginas inline


    });

    // CODIGO PARA EJECUTAR PAGINA AL INICIAR
    //myApp.mainView.router.loadPage('login.html');
    

    // Option 1. Usar la devolución de llamada de página para la página
    myApp.onPageInit('casos', function (page) {

        casos();
        
        $$('.confirmar').on('click', function () {
            //alertaConfirmar
            var caso = document.getElementById("caso");
            myApp.modal({
                title:  'Advertencia',
                text: 'Deseas registrar el caso: ' + caso.value + '?',
                buttons: [
                {
                    text: 'Si',
                    onClick: function() {
                        //modificar datos del modal en framework7.js
                        myApp.alert('Caso Registrado');
                        var view = myApp.getCurrentView();
                        if (!view) return;
                        if (view.history.length > 1) {
                            view.router.back();
                            return;
                        }

                    }
                },
                {
                    text: 'NO',
                    onClick: function() {
                        //VOLVER
                        /*var view = myApp.getCurrentView();
                        console.log(view);
                        if (!view) return;
                        if (view.history.length > 1) {
                            view.router.back();
                            return;
                        }*/
                    }
                },
                ]
            })
        });
        $$('.cancelar').on('click', function () {
            //alertaCancelar
            myApp.alert('Se perdieron los datos',function(){
                var view = myApp.getCurrentView();
                console.log(view);
                if (!view) return;
                if (view.history.length > 1) {
                    view.router.back();
                    return;
                }
            });
        });

    })

    myApp.onPageInit('login', function (page) {

        etiquetaSeleccionada(true);

        $('#verificarLogin').on('click', function (e) {
            
            verificarLogin(myApp);
        });
        //FIN VERIFICAR USUARIO//
        $('#cancelarLogin').on('click', function (e) {
            
            var view = myApp.getCurrentView();
            view.router.back()
        });

    })

    myApp.onPageInit('publicacion', function (page) {

        var arrayNotificaciones = JSON.parse(jsonNotificaciones);

        
        for (var x = 0; x <= arrayNotificaciones.length -1 ; x++) {
            if (arrayNotificaciones[x].id== idEvento)
            {
                document.getElementById('pTitulo').innerHTML= arrayNotificaciones[x].titulo;
                document.getElementById('pSubtitulo').innerHTML= arrayNotificaciones[x].subtitulo;
                document.getElementById('pDescripcion').innerHTML= arrayNotificaciones[x].descri;
                document.getElementById('pImagen').src= arrayNotificaciones[x].foto;
            }
            
        }
        

    })

    myApp.onPageInit('register', function (page) {
    })

    

    // Handle Cordova Device Ready Event
    $$(document).on('deviceready', function() {

        //myApp.mainView.router.loadPage('about.html');
        //myApp.mainView.router.load({url: "/about.hmtl"})
        //console.log(myApp.mainView.activePage);
        //myApp.mainView.activePage= 'about.html';
        //console.log(myApp.mainView.main);

        etiquetaSeleccionada(false);

        cargarListado();
        

        //VOLVER ATRAS
         document.addEventListener("backbutton", function(e){
            e.preventDefault();
            /*SI EL MENU LATERAL ESTA ABIERTO*/
            if ($$('.panel.active').length > 0) {
                myApp.closePanel();
                return;
            }
            /*SI HAY UN HISTORIAL: PAGINA ABIERTA*/
            /*
            var view = myApp.getCurrentView();
            console.log(view);
            if (!view) return;
            if (view.history.length > 1) {
                view.router.back();
                return;
            }
            */
            /*SI NO SE CUMPLE LO ATERRIOR: CERRAR APP*/
            myApp.confirm('¿Quiere salir de la aplicación?', 'Atención!', function () {
                navigator.app.exitApp();
            });

        }, false);

        console.log("Device Ready!");
    });



}


inicializarF7();
