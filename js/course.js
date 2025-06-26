document.addEventListener("DOMContentLoaded", iniciar);
function iniciar (){
    let courseBtn = document.querySelector("#course-menu");
    let courseList = document.querySelector(".nav-list");
    let courseItems = document.querySelectorAll(".nav-item a");

    courseBtn.addEventListener("click", showTopics);
    function showTopics (){
        courseList.classList.toggle("show");
    }

        /* https://stackoverflow.com/questions/74859259/mobile-menu-close-on-clicking-menu-item-js */
        /* a cada elemento de la lista le agrego un evento al cliquear */
    courseItems.forEach(element => { //el for each recorre cada uno de los elementos de la lista de cursos. Ejecutamos una funcion anonima que tiene por parámetro a "element" y lo hace "oyente" del evento click  luego definimos qué debe hacer cuando hacen click. 
        element.addEventListener("click", () => {
            courseList.classList.remove("show"); 
        });
    });

    let menuBtn = document.getElementById("open-menu");
    menuBtn.addEventListener("click", showMainMenu);

    function showMainMenu() {
        document.querySelector(".nav-menu").classList.toggle("show");
        if (document.querySelector(".nav-menu").classList.contains("show")){
            courseList.classList.remove("show");
        }
    }
}