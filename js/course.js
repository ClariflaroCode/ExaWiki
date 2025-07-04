//document.addEventListener("DOMContentLoaded", iniciar);
function generateIndexCourseMenu (){
    let courseBtn = document.querySelector("#course-menu");
    let courseList = document.querySelector(".nav-list");
    let courseItems = document.querySelectorAll(".nav-item a");

    courseBtn.addEventListener("click", showTopics);
    function showTopics (){
        courseList.classList.toggle("show");
    }

    courseItems.forEach(element => { 
        element.addEventListener("click", () => {
            courseList.classList.remove("show"); 
        });
    });


}