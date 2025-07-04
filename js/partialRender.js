document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    let currentJsLoaded = [];
    let currentCSSLoaded = []; 
    const pages = {
        "/courses.html": {
            "css": ["css/index.css" ],
            "js": {}
        },
        "/consultanos.html": {
            "css": ["css/consultanos.css"],
            "js":  {"js/consultanos.js":"generateCaptchaScript" }
        },
        "/about_us.html": {
            "css": ["css/sobre_nosotras.css"],
            "js": {}
        },
        "/programming_introduction.html": {
            "css": [ "css/course.css"],
            "js": 
                {
                    "js/course.js":"generateIndexCourseMenu",
                    "js/mockapi.js": "iniciarMockapi"
                }
        },
        "/web_1.html":{
            "css": [ "css/course.css"],
            "js": { "js/course.js": "generateIndexCourseMenu"}
        
        }

    }    //creamos un vínculo para saber que hay que cargar. 


    let main = document.getElementById("page-main");


    let links = document.querySelectorAll(".link");
    asignarPartialRender(links);

    async function partialRender(url) {
        let newString = String(url);
        try {
            let response = await fetch(newString);
            if (response.ok) {
                let html = await response.text(); 
                main.innerHTML = html; 
                //removeEventListener()
                if (newString.endsWith('courses.html')){
                    let links = document.querySelectorAll('#home .link'); 
                    asignarPartialRender(links);
                }
                if (!document.querySelector("#course-menu") && (newString.endsWith('programming_introduction.html') || newString.endsWith('web_1.html'))){ 
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
                
                
                
                /*if(page["loaded"] == false) {
                    suscribirJavaScript(page);
                    suscribirCSS(page);    
                    page["loaded"] = true;
                }*/
                //let cleanUrl = url.startsWith("/") ? url.slice(1) : url;
                const page = pages[newString];
                suscribirJavaScript(page);
                suscribirCSS(page);  

                   
            }
        } catch (error) {
            console.log(error);
        }
    }

    const route = (event) => {
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({},"", event.target.href);
        handleLocation();
    }
    const routes = {
        404: "/pages/404.html",
        "/":"/courses.html",
        "/about_us": "/about_us.html",
        "/consultanos": "/consultanos.html", 
        "/programming_introduction": "/programming_introduction.html", 
        "/web_1": "/web_1.html"
    }
    const handleLocation = async () => {
        const path = window.location.pathname;
        const route = routes[path] || routes[404];
        partialRender(route);
        //const html = await fetch(route).then((data) => data.text());
        //main.innerHTML = html;
    }
    window.onpopstate = handleLocation;
    window.route = route;
    handleLocation();

    function asignarPartialRender(arreglolinks) { //suscribe los elementos del arreglo links al evento. 
        
        for(let index=0; index < arreglolinks.length; index ++) {
            const element = arreglolinks[index];
            element.addEventListener('click', function(event) {
                route(event);
                //let href = e.target.getAttribute("href");
                //partialRender(String(this.getAttribute('href')));
                //navigate("/" + href);   
                
            });
        }
    }
    function suscribirJavaScript(currentPageToLoad) {
        
        let jsToImport = currentPageToLoad["js"];
        
        let divOfScripts = document.querySelector("#scripts"); 
        divOfScripts.innerHTML = "";
         
        for (let jsImport in jsToImport) { //RECORRE POR CLAVES SI ES IN, SE USA EN OBJETOS.
            const nombreFuncion = jsToImport[jsImport];
            if (!currentJsLoaded.includes(jsImport)) {
                let tagScript = document.createElement('script');
                tagScript.type = "text/javascript";
                tagScript.src = jsImport;
                tagScript.onload = () => { //TENGO QUE VER SI SE CARGÓ EL SCRIPT. 
                    if (typeof window[nombreFuncion] === "function") { //SI LA FUNCION ESTA DECLARADA EN MEMORIA 
                        window[nombreFuncion](); //LA LLAMO. 
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
    
    
}