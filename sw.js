const version = "11";

let fichiers_offline = [
    '/index.html',
    '/style.css',
    '/app.js',
    'reset.css'
]

//instalation du SW
self.addEventListener("install", function (event) {
    console.warn("SW version " + version + " - Install Event");
    self.skipWaiting()
    event.waitUntil(
        caches.open("cache-v1").then(function (cache) {
            console.log("mise en cache des fichiers");
            return cache.addAll(fichiers_offline)

        })
            .catch(function (erreur) {
                console.log(erreur);

            })
    )
})

//activation du SW
self.addEventListener("activate", function (event) {
    console.warn("SW version " + version + " - Activate Event");
})

self.addEventListener("fetch", function (event) {
    console.warn("SW - Fetch Event")
    console.log(event.request);
    //if (event.request.url == "http://localhost:5000/page2") {
    //event.respondWith(
    //new Response("Requête intercepté et modifiée")
    //)
    //}


    event.respondWith(
        fromCache(event.request)
            .then(function (response) {
                console.warn("il y a bien correspondance avec le cache" + event.request.url);
                return response;
            })

            .catch(function (response) {
                console.warn("il n'y à pas ce fichier en cache, on va chercher en ligne sur le serveur..." + event.request.url);
                return fetch(event.request);
            })
    )
})

//Récupérer mes fichiers en cache
function fromCache(request) {
    return caches.open("cache-v1").then(function (cache) {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }
            else {
                return matching;
            }

        })
    })
}
