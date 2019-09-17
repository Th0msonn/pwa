//Déclaration du Service worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function () {
        console.log('SW inscrit');
    });
}



//let bouton_menu = document.querySelector(".burger");
//let menu = document.querySelector("header nav");

document.addEventListener("click", afficheMenu);

function afficheMenu() {
    var menu = document.querySelector('header nav')

    //console.log(event.target.matches("header"));

    //if (!event.target.matches('.burger') && !event.target.matches('header nav')) {
    //console.log("ce n'est pas un burger et nav");
    //if (menu.classList.contains('active')) {
    // menu.classList.remove('active')
    // }
    // return;
    // }
    // menu.classList.add('active');

    if (event.target.matches(".burger") || event.target.matches("header nav")) {
        menu.classList.add('active');
    }
    else {
        menu.classList.remove('active')
    }

};


