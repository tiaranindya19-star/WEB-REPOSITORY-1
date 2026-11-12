const V="safe-project-lapangan-v9";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
if(e.request.method!=="GET")return;
e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
if(r.ok&&(e.request.url.startsWith(self.location.origin)||e.request.url.includes("fonts.g"))){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));}
return r;}).catch(()=>caches.match("index.html"))));});
