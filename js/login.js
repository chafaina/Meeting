console.log('login.js');
var registros ;

storage = window.localStorage;

var registro = [
	{correo: 'vmatias888@gmail.com', contraseña: '1234', activo: 1}
];

storage.setItem("registros", JSON.stringify(registro));

function verificarLogin(myApp){
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
                //myApp.mainView.router.loadPage('index.html');
                var view = myApp.getCurrentView();
                view.router.back();
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
};

/*
//CARGAMOS LOS REGISTROS DEL LOCALSTORAGE (variable definida previamente)
registros = storage.getItem("registros");
//PARSE convierte un objeto json en javascript
registros=JSON.parse(registros);
//si no tiene ningun valor, lo generamos con un array vacio
if(registros==null){
	 registros = [];
}
//Agregamos un registro a los registros del JSON
registros.push(registro);
//lo alamacenamos con el nombre registro
storage.setItem("registros", JSON.stringify(registros));
*/


/*
$("#login").click(function(){
	console.log('ingreso al click');
	if ($('#correo').val()!= '')
	{
		console.log('ingreso al click');
		//TOMAMOS REGISTROS
		registros = storage.getItem("registros");
		//PARSE convierte un objeto json en javascript
		registros=JSON.parse(registros);
		//si no tiene ningun valor, lo generamos con un array vacio
		if(registros==null){
			 registros = [];
		}

		for (var i = 0 - 1; i <=registros.length; i++) {
			if (registros[i].correo == $("#correo").val() ) {
				console.log(registros[i].correo);
			}
		}
	}
	else
	{
		console.log('Ingresar Correo');
	}
});
*/


/*
//CUANDO EL USUARIO HACE CLICK
$("#login").click(function(){
	console.log('click');
	//falta validacion
	var correo = $("#correo").val();
	var pass = $("#pass").val();
	//stringfy arma el objeto JSON
	var registro = JSON.stringify({
	 	correo: correo,
	 	contraseña: pass,
	 	activo: 1
	});
	//añadir al objeto JSON
	registros.push(registro);
	//lo alamacenamos con el nombre registro
	storage.setItem("registros", JSON.stringify(registros));
	//Actualiza mensaje
	document.getElementById("salida").innerHTML = "<p>Titulos fuera de línea: "+registros.length+"</p>";
	alert("Registro añadido fuera de línea existosamente");
	return true;
});
*/

