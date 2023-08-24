/* eslint-disable no-restricted-globals */
const urls = [
  '/',
  '/index.html',
];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

const addResponse = async (request) => {
  const response = await caches.match(request)
  if (response) return response;
  return request;
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    addResourcesToCache(urls)
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    addResponse(event.request)
  );
});