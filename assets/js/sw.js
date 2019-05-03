
console.log('Service Worker : Registered');

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/assets/js/dbhelper.js',
  '/assets/js/restaurant_info.js',
  '/data/restaurants.json',
  '/assets/images/1.jpg',
  '/assets/images/2.jpg',
  '/assets/images/3.jpg',
  '/assets/images/4.jpg',
  '/assets/images/5.jpg',
  '/assets/images/6.jpg',
  '/assets/images/7.jpg',
  '/assets/images/8.jpg',
  '/assets/images/9.jpg',
  '/assets/images/10.jpg',
];
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open('v1').then(function(cache){
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e){
  e.respondWidth(
    caches.match(e.request).then(function(response){
      if (response){
        console.log('Found ' , e.request, ' in cache');
        return response;
      } else {
        console.log('Could not find ', e.request, ' in cache, FETCHING');
        return fetch(e.request)
        .then(function(response){
        const cloneResponse = response.clone();
          caches.open(v1).then(function(cache){
            cache.put(e.request , cloneResponse);
          })
          return response;
        })
        .catch(function(err){
          console.error(err);
        });
      }
    })
  );
});