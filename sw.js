const C="lander-v3-layout-final";
const ASSETS=["./","./index.html","./manifest.json","./icon.svg","./lander-bg.jpeg"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.mode==="navigate"){
  e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{let x=r.clone();caches.open(C).then(c=>c.put("./index.html",x));return r}).catch(()=>caches.match("./index.html")));
 }else{
  e.respondWith(fetch(e.request).then(r=>{let x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request)));
 }
});