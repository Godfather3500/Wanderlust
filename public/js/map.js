// public/js/map.js
function initializeMap(latitude, longitude, title, location, country) {
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof L === "undefined") {
      console.error("Leaflet library not loaded");
      return;
    }

    // Initialize the map
    const map = L.map("map").setView([latitude, longitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add marker for the listing location
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`<b>${title}</b><br>${location}, ${country}`)
      .openPopup();
  });
}
