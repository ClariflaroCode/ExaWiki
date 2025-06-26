document.addEventListener("DOMContentLoaded", iniciar);
function iniciar(){
    document.getElementById("formulario").addEventListener("submit", verifyCaptcha); //esto se hace así para que salgan los "completa este campo" del formulario si intentas enviar el captcha sin haberlos completado. Con el evento click en el boton directamente no pasaba, capaz se puede igual.  
    let indice; 
    const arr = [ 
                "gato",
                "perro",
                "colibri", 
                "hamster",
                "burro", 
                "delfin", 
                "elefante", 
                "jirafa", 
                "leon",
                "conejo", 
                "koala", 
                "canguro", 
                "hipopotamo", 
                "mariposa", 
                "murcielago", 
                "aguila", 
                "narval", 
                "vombátido", 
                "castor", 
                "ornitorrinco", 
                "mamut", 
                "avestruz", 
                "ciervo", 
                "liebre", 
                "mara", 
                "ostrero", 
                "tiburon", 
                "ballena", 
                "caballo", 
                "polilla", 
                "raton", 
                "escarabajo", 
                "foca", 
                "pinguino", 
                "gallina", 
                "vaca", 
                "gallo", 
                "oveja", 
                "toro", 
                "camaleon", 
                "iguana", 
                "rinoceronte", 
                "cebra", 
                "hornero", 
                "gorrion", 
                "benteveo", 
                "paloma", 
                "zorro", 
                "lobo", 
                "tigre", 
                "puma", 
                "armadillo", 
                "pantera", 
                "carpincho", 
                "cuis", 
                "llama", 
                "yaguarete", 
                "hiena", 
                "jabali", 
                "oso hormiguero", 
                "hormiga", 
                "lechuza", 
                "buho", 
                "loro", 
                "cotorra", 
                "lemur", 
                "topo", 
                "comadreja", 
                "zarigueya",
                "mono", 
                "chimpance", 
                "orangutan",
                "erizo", 
                "tortuga", 
                "abeja", 
                "abejorro", 
                "avispa", 
                "pato", 
                "cisne", 
                "renacuajo", 
                "rana", 
                "sapo", 
                "cangrejo", 
                "pulpo", 
                "estrella de mar", 
                "pez linterna", 
                "mariquita", 
                "ajolote",
                "libelula", 
                "cuervo", 
                "condor", 
                "oso", 
                "panda", 
                "remora", 
                "pez espada", 
                "caballito de mar", 
                "dragon de komodo", 
                "oruga", 
                "gaviota", 
                "cerdito",
                "camello", 
                "caracol", 
                "bicho bolita", 
                "grillo", 
                "saltamontes", 
                "nutria", 
                "ardilla", 
                "alacran", 
                "escorpion", 
                "chinchilla",
                "mantarraya", 
                "polilla atlas", 
                "clamidosaurio", 
                ]; 
                
    //#DATO CURIOSO: el clamidosaurio es el reptil en el que se basó uno de los dinosaurios de JURASSIC PARK. 
    captchaGenerator();
    function captchaGenerator (){


        indice = Math.floor(Math.random() * (arr.length)); //genera un numero random con MathRandom que está entre (0,1) lo multiplica por la cantidad de elementos del arreglo y se queda con la parte entera inferior (función piso quiere decir con floor())
        //y esto te da un número entre cero y arr.length -1. Lo cual es correcto porque son los indices minimo y máximo del arreglo.  
        console.log(indice);
        console.log(arr[indice]);

        document.getElementById("captcha").innerHTML = arr[indice];
    }

    function verifyCaptcha(event) {
        event.preventDefault();
        let userReply = document.getElementById("user-reply").value; //consultamos qué escribió el usuario en el input del captcha. 
        if (arr[indice] === userReply) {
            //ingresó el captcha correcto
            document.getElementById("captcha-inform").classList.remove("captcha-result-incorrect");
            document.getElementById("captcha-inform").innerHTML="Captcha correcto. Mensaje enviado";
        }
        else {
            //ingresó un captcha incorrecto
            document.getElementById("user-reply").value = ""; //esto lo que escribió el usuario en el input previamente. 
            document.getElementById("captcha-inform").innerHTML="Captcha incorrecto. Vuelva a intentarlo";
            document.getElementById("captcha-inform").classList.add("captcha-result-incorrect");
            captchaGenerator(); //generamos un nuevo captcha 
        }
        
    }
}