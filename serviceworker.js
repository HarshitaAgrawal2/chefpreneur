const staticFiles = [
    './',
    './chef.css',
    './app.js',
    './chefpreneur.html',
    './contact.html',
    './rules.html',
    './FAQs.html'
];

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
})