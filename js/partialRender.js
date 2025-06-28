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
    const pages = {
        "sites/courses.html": {
            "css": ["../css/index.css" ],
            "js": [],
            "loaded": false
        },
        "sites/consultanos.html": {
            "css": ["../css/consultanos.css"],
            "js": [ "../js/consultanos.js"],
            "loaded": false
        },
        "sites/about_us.html": {
            "css": ["../css/sobre_nosotras.css"],
            "js": [],
            "loaded": false
        },
        "programming_introduction.html": {
            "css": [ "../css/course.css"],
            "js": ["../js/course.js","../js/mockapi.js"],
            "loaded": false
        },
        "web_1.html":{
            "css": [ "../css/course.css"],
            "js": [ "../js/course.js"],
            "loaded": false
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
                if (newString.endsWith('programming_introduction.html')){ //se puede hacer esto harcodeado para llamar a la funcion que llama a todo de cada html. 
                    iniciarMockapi();
                }
                let links = document.querySelectorAll('#home .link'); //todas las paginas principales tienen un 
                asignarPartialRender(links);
                
                //window.location.assign(url);
                //window.history.pushState(data, "", url);
                
                
                
                const page = pages[url];//accedemos a partir de la clave html que queremos para poder acceder al valor de objeto que queremos. Es más eficiente. 
                if(page["loaded"] == false) {
                    suscribirJavaScript(page);
                    suscribirCSS(page);    
                    page["loaded"] = true;
                }
                            
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
        for (let jsImport of jsToImport) {
            let tagScript = document.createElement('script');
            tagScript.type = "text/javascript";
            tagScript.src = jsImport;
            /*script.onload = () => {
                if (typeof iniciar === 'function') iniciar(); //  de esta forma se podría llamar a las funciones de los scripts si dejo el domcontentloaded. 
            };*/
            divOfScripts.appendChild(tagScript);
        }




    }
    function suscribirCSS(currentPageToLoad) { //necesita ser un fetch? 

        let head = document.querySelector("head");
        let cssLinks = currentPageToLoad["css"]; //trae el arreglo con los nombres de los archivos css
        for (let csslink of cssLinks) {
            let tagLink = document.createElement('link');
            tagLink.rel = "stylesheet";
            tagLink.href = csslink;
            head.appendChild(tagLink);
        }
        

    }
    
    partialRender("sites/courses.html");
}