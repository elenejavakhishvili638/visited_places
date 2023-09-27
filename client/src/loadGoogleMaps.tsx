const apiKey = import.meta.env.VITE_MAPS_API_KEY;

function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly`;
    script.async = true;
    document.body.appendChild(script);
}

loadGoogleMaps();
