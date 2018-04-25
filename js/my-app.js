//VARIABLES

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

    // CODIGO PARA EJECUTAR NUESTRAS PAGINAS
    myApp.mainView.router.loadPage('login.html');
    

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

        etiquetaSeleccionada(false);

        $('#verificarLogin').on('click', function (e) {
            
            if ($("#correo").val()!= '')
            {
                //TOMAMOS REGISTROS
                registros = storage.getItem("registros");
                //PARSE convierte un objeto json en javascript
                registros=JSON.parse(registros);
                //si no tiene ningun valor, lo generamos con un array vacio
                if(registros==null){
                     registros = [];
                }

                for (var i = 0 ; i <=registros.length - 1; i++) {
                    //Ingresar a la app si la validacion es correcta
                    if (registros[i].correo == $("#correo").val() ) {
                        console.log(registros[i].correo);
                        myApp.mainView.router.loadPage('index.html');
                    }
                    else
                    {
                        //alert confirm estilo f7
                        myApp.modal({
                            title:  'Advertencia',
                            text: 'No existe el usuario ingresado, ¿Registrar uno nuevo?',
                            buttons: [
                            {
                                text: 'Aceptar',
                                onClick: function() {
                                    myApp.mainView.router.loadPage('register.html');
                                    cargarListado();
                                }
                            },
                            {
                                text: 'Cancelar',
                                /*onClick: function() {
                                    myApp.alert('Se perdieron los datos');
                                }*/

                            },
                            ]
                        })
                        /*alert confirm estilo windows
                        var mensaje;
                        var opcion = confirm ("No existe el usuario ingresado, ¿Registrar uno nuevo?");
                        if (opcion == true){
                            mensaje= 'true';
                            myApp.mainView.router.loadPage('register.html');
                        }
                        */
                    }
                }
            }
            else
            {
                //var opcion = confirm ("Por favor, ingresar sus credenciales!");
                myApp.modal({
                    title:  'Datos Faltantes',
                    text: 'Por favor, ingresar sus credenciales',
                    buttons: [
                    {
                        text: 'Aceptar',
                        onClick: function() {

                        }
                    },
                    {
                        text: 'Cancelar',
                        onClick: function() {
                            myApp.alert('Se requiere credenciales para ingresar a la aplicacion');
                        }
                    },
                    ]
                })

            }
        });
        //FIN VERIFICAR USUARIO//

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
            var view = myApp.getCurrentView();
            console.log(view);
            if (!view) return;
            if (view.history.length > 1) {
                view.router.back();
                return;
            }
            /*SI NO SE CUMPLE LO ATERRIOR: CERRAR APP*/
            myApp.confirm('¿Quiere salir de la aplicación?', 'Atención!', function () {
                navigator.app.exitApp();
            });
        }, false);

        console.log("Device Ready!");
    });



}


inicializarF7();
