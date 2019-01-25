const staticFiles = [
    './',
    './chef.css',
    './app.js',
    './chefpreneur.html',
    './contact.html',
    './rules.html',
    './FAQs.html'
];
var mode;

// On installing the app, first time, cache all the staticFiles =>
self.addEventListener("install", (e) => {
    console.log("[Service Worker] Installed");
    // wait untill event is complete =>
    e.waitUntil(
        caches.open("staticCache").then((cache) => {
            console.log("Caching static files")
            cache.addAll(staticFiles);
        })
    )
});

self.addEventListener('message', function(event){
    if(event.data=="offline")
    mode=false
    else
    mode=true
    console.log("message: "+mode);
});

self.addEventListener('fetch', event => { 
    console.log(event);
    const {request} = event;
    const url = new URL(request.url);
    if(mode==false) //check if online or offline
    event.respondWith(cacheData(request)); // if offline we have to check cache
    else{
        if(url.origin === location.origin) { // if the url that we are searching for is in the domain check cache first
            event.respondWith(cacheData(request));
        } else {
            //event.respondWith(networkFirst(request)); // for outside urls do not check cache 
        }
    }

});
