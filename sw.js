// Define the Caches
var staticCacheName = 'mws-restaurant-static-v';
// Set Get Random number for Cache ID
 var randomNumberBetween0and19999 = Math.floor(Math.random() * 20000);
 var cache_id = randomNumberBetween0and19999;
 staticCacheName += cache_id;

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      'index.html',
      'restaurant.html',
      '/css/main.css',
      '/css/responsive.css',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
      '/js/register.js',
    ])
    .catch(error => {
      
    });
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', 
function(event) 
{
  event.respondWith
  (    
    caches.match(event.request)
    .then
    (
      function(response) 
      {
        if (response !== undefined) 
        {
          return response;
        } 
      
        else 
        {        
          return fetch(event.request).then
          (
              function (response) 
              {
                let responseClone = response.clone();
                
                caches.open(staticCacheName)
                .then
                (
                  function (cache) 
                  {
                    cache.put(event.request, responseClone);
                  }
                );
                return response;
              }
          );
        }
      }
    ) // end of promise for cache match
      
  ); // end of respond with

}
);



 
