//CADA VEZ QUE HACE CLCIK CAMBIA EL ATRIBUTO CLASS
function etiquetaSeleccionada(newPage){
    //Activa la etiqueta en el evento click
    $('.elementPress').on('click', function (e) {
        var popup = document.getElementsByClassName("col button button-fill color-green")[0];
        //Verifica que no este vacio
        if (popup != null) {
            popup.setAttribute("class","col button color-green");
            //console.log(popup);
        }
        //Porque se genera dos etiquetas con la misma class al abrir una nueva pagina
        if(newPage==true){
            var popup = document.getElementsByClassName("col button button-fill color-green")[0];
            //Verifica que no este vacio
            if (popup != null) {
            popup.setAttribute("class","col button color-green");
            //console.log(popup);
        }
        }
        //console.log($$(this).attr('html'));
        e.target.setAttribute("class","col button button-fill color-green");
        //console.log (e.target);

    });
}

//MOSTRAR PANEL LATERAL
function visiblePopup(){
    var popup = document.getElementById("myPopup");
    //popup.classList.toggle("show"); //agrega la class show > movil.css
    //popup.setAttribute("class","show");
    
    //En el primer click no esta definido el hidden por eso el ''
    if (popup.style.visibility =='hidden' || popup.style.visibility =='') {
        popup.style.visibility= 'visible';
    }
    else
    {
        popup.style.visibility= 'hidden';
    }
    
};

//ESCONDER PANE LATERAL
function hiddenPopup(){
    var popup = document.getElementById("myPopup3");
    popup.setAttribute("class","spanPopup");
    console.log("clickeado")
}

//OBTENER EL ID DEL ELEMENTO onclick
function obtenerIdEvento(elemento){
    idEvento= elemento.id; 
    //console.log(idEvento);
};
