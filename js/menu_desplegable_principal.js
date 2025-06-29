document.addEventListener("DOMContentLoaded", generateToggleMainMenu);
function generateToggleMainMenu (){
    document.getElementById("open-menu").addEventListener("click", menuDesplegablePrincipal);

    function menuDesplegablePrincipal() {
        document.querySelector(".nav-menu").classList.toggle("show");
    }
}