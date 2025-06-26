document.addEventListener("DOMContentLoaded", iniciar);
function iniciar (){
    document.getElementById("open-menu").addEventListener("click", menuDesplegablePrincipal);

    function menuDesplegablePrincipal() {
        document.querySelector(".nav-menu").classList.toggle("show");
    }
}