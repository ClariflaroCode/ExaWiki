document.addEventListener("DOMContentLoaded", iniciar);
    function iniciar(){
    let userPreference = localStorage.getItem("userThemePreference");
    setUserThemePreference();
    document.getElementById("switch-light-dark").addEventListener("click", switchDarkMode);

    function setUserThemePreference() {
        
        let icon = document.getElementById("theme-img");

        if ((userPreference == null) || (userPreference == "claro") ){
            //no tiene una preferencia establecida y le establecemos por defecto que sea claro ó su preferencia es claro. 
            userPreference = "claro";
            localStorage.setItem("userThemePreference", "claro");
            document.getElementById("fondo").classList.add("claro");
            document.getElementById("fondo").classList.remove("oscuro");
            icon.src = "../img/lunitauwu.png";
        }
        else {
            //tiene una preferencia y es oscuro
            document.getElementById("fondo").classList.add("oscuro");
            document.getElementById("fondo").classList.remove("claro");
            icon.src = "../img/solcitouwu.png";
            
        }

    }

    function switchDarkMode(){

        userPreference = localStorage.getItem("userThemePreference");
        let icon = document.getElementById("theme-img");
    

        if (userPreference == "claro"){

            document.getElementById("fondo").classList.add("oscuro");
            document.getElementById("fondo").classList.remove("claro");
            icon.src = "../img/solcitouwu.png";

            localStorage.setItem("userThemePreference", "oscuro");

        } else {

            document.getElementById("fondo").classList.add("claro");
            document.getElementById("fondo").classList.remove("oscuro");
            icon.src = "../img/lunitauwu.png";

            localStorage.setItem("userThemePreference", "claro");


        }
        
    }
}