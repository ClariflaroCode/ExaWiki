document.addEventListener("DOMContentLoaded", iniciar);
//se puede hacer un head.appendChild(link) //para importar los css? //listo se peude
//para importar los scripts, está bien lo que se hizo?
//hardcodeamos los links de acuerdo a la URL con un case o alguna cosa así? o creamos un objeto o arreglo que de acuerdo al html de pagina importado lo busque por clave y se traiga su css y su script correspondiente ? 
// con los link que tengan lo que nos traemos como hacemos para suscribirles a partial render? ver cards para ingresar a los cursos. 
//si es un curso en el que estamos, el nav tiene un boton más, tendríamos que hacerle un append child de eso al nav? 
// y si borramos ese menu desplegable y lo separamos en unidades que opinas? 
//mostrarle lo que hicimos con mockapi. 
//tenes 




/**
 * 
 *      hacer todo un js y llamar la funcion
 * 
 * 
 */
function iniciar() {
    let currentJsLoaded = []; //ver si se puede hacer con un objeto. 
    let currentCSSLoaded = []; //x2
    const pages = {
        "sites/courses.html": {
            "css": ["../css/index.css" ],
            "js": {}
        },
        "sites/consultanos.html": {
            "css": ["../css/consultanos.css"],
            "js":  {"../js/consultanos.js":"generateCaptchaScript" }
        },
        "sites/about_us.html": {
            "css": ["../css/sobre_nosotras.css"],
            "js": {}
        },
        "sites/programming_introduction.html": {
            "css": [ "../css/course.css"],
            "js": 
                {
                    "../js/course.js":"generateIndexCourseMenu",
                    "../js/mockapi.js": "iniciarMockapi"
                }//RE FLASHERO: "functionsToActivate": [iniciarMockapi] pero necesito que se ejecute antes la funcion... 
        },
        "sites/web_1.html":{
            "css": [ "../css/course.css"],
            "js": { "../js/course.js": "generateIndexCourseMenu"}
        
        }

    }    //creamos un vínculo para saber que hay que cargar. 


    let main = document.getElementById("page-main");
    //suscribirLinksAPartialRender();

    let links = document.querySelectorAll(".link");
    asignarPartialRender(links);

    async function partialRender(url) {
        let newString = String(url);
        try {
            let response = await fetch(newString);
            if (response.ok) {
                let html = await response.text(); 
                main.innerHTML = html; //traigo el HTML correspondiente. 
                //removeEventListener()
                if (newString.endsWith('courses.html')){ //se puede hacer esto harcodeado para llamar a la funcion que llama a todo de cada html. 
                    let links = document.querySelectorAll('#home .link'); 
                    asignarPartialRender(links);
                }
                if (!document.querySelector("#course-menu") && (newString.endsWith('programming_introduction.html') || newString.endsWith('web_1.html'))){ //se puede hacer esto harcodeado para llamar a la funcion que llama a todo de cada html. 
                    let header = document.querySelector('header');
                    let indexCourseButton = document.createElement('button');
                    indexCourseButton.innerHTML = "temas";
                    indexCourseButton.id = "course-menu";
                    indexCourseButton.class = "button"; 
                    header.appendChild(indexCourseButton);
                } else {
                    let header = document.querySelector('header');
                    const botonTemas = document.querySelector("#course-menu");
                    if (botonTemas != null) {
                        header.removeChild(botonTemas);
                    }
                }
                
                
                //window.location.assign(url);
                //window.history.pushState(data, "", url);
                
                
                
                const page = pages[url];//accedemos a partir de la clave html que queremos para poder acceder al valor de objeto que queremos. Es más eficiente. 
                /*if(page["loaded"] == false) {
                    suscribirJavaScript(page);
                    suscribirCSS(page);    
                    page["loaded"] = true;
                }*/
                suscribirJavaScript(page);
                suscribirCSS(page);  

                   
            }
        } catch (error) {
            console.log(error);
        }
    }
    function asignarPartialRender(arreglolinks) { //suscribe los elementos del arreglo links al evento. 
        
        for(let index=0; index < arreglolinks.length; index ++) {
            const element = arreglolinks[index];
            element.addEventListener('click', function(e) {
                e.preventDefault();
                partialRender(String(this.getAttribute('href')));
            });
        }
    }
    function suscribirJavaScript(currentPageToLoad) {
        /*************************
         * 
         * 
         * 
         * 
         * 
         *              PREGUNTAR A ALE
         * 
         *              
         *              pedir auxilio con el history y preguntar por rutas absolutas y mieldas varias :3
         * 
         * 
         * 
         * 
         * ******************************* */
        
        let jsToImport = currentPageToLoad["js"];
        
        let divOfScripts = document.querySelector("#scripts"); //lo importo acá y elimino las funciones de DOMContentLoaded para no hardcodearlas acá para que se activen (igual todas se llaman iniciar) o las llamo acá y dejo lo de DOMContentLoaded?
        divOfScripts.innerHTML = "";
        //currentJsLoaded = []; NO SE PUEDE HACER ESTO PORQUE LAS VARIABLES GLOBALES Y LA DECLARACION DE FUNCIONES GLOBALES VIVEN EN MEMORIA UNA VEZ QUE FUERON CONOCIDAS, HACER ESTO NO LAS BORRA, VOLVER A LLAMAR EL SCRIPT NO CAMBIA NADA PORQUE EL SCRIPT ES SOLO UNA REFERENCIA AL CODIGO, NO ES EL CODIGO QUE SE GUARDÓ EN MEMORIA, ESTE AUNQUE SE HAYA TERMINADO DE EJECUTAR NO LIBERA DE LA MEMORIA LAS DECLARACIONES DE VARIABLES O FUNCIONES GLOBALES. Y PINCHE JAVASCRIPT ORTIVA QUE NO ME VA A DEJAR NO HARDCODEAR EL LLAMADO A FUNCIONES.  
        for (let jsImport in jsToImport) { //RECORRE POR CLAVES SI ES IN, SE USA EN OBJETOS.
            const nombreFuncion = jsToImport[jsImport];
            if (!currentJsLoaded.includes(jsImport)) {
                let tagScript = document.createElement('script');
                tagScript.type = "text/javascript";
                tagScript.src = jsImport;
                /*script.onload = () => {
                    if (typeof iniciar === 'function') iniciar(); //  de esta forma se podría llamar a las funciones de los scripts si dejo el domcontentloaded. 
                };*/
                

                tagScript.onload = () => {
                    if (typeof window[nombreFuncion] === "function") {
                        window[nombreFuncion]();
                    }
                }
                divOfScripts.appendChild(tagScript);
                currentJsLoaded.push(jsImport);
                
            } else {
                if (typeof window[nombreFuncion] === "function") {
                    window[nombreFuncion]();
                } else {
                    console.warn(`La función "${nombreFuncion}" no está definida todavía`);
                }
            }

        }
        console.log(currentJsLoaded);
    }
    function suscribirCSS(currentPageToLoad) { //ojo porque esto acumula css, que no hayan reglas que se contradigan. 

        let head = document.querySelector("head");
        let cssLinks = currentPageToLoad["css"]; //trae el arreglo con los nombres de los archivos css
        for (let csslink of cssLinks) {
            if (!currentCSSLoaded.includes(csslink)){
                let tagLink = document.createElement('link');
                tagLink.rel = "stylesheet";
                tagLink.href = csslink;
                head.appendChild(tagLink);
                currentCSSLoaded.push(csslink);
            } 
        }
    }
    
    partialRender("sites/courses.html");
}