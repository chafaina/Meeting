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
        //Porque se genera dos etiquetas con la misma class
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
