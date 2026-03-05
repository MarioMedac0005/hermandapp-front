// Haversine Distance Helper
export const getDistance = (point1, point2) => {
    const EARTH_RADIUS = 6371000; // metros

    const lat1 = point1[1] * Math.PI / 180;
    const lat2 = point2[1] * Math.PI / 180;
    const deltaLat = (point2[1] - point1[1]) * Math.PI / 180;
    const deltaLon = (point2[0] - point1[0]) * Math.PI / 180;

    const sinLat = Math.sin(deltaLat / 2);
    const sinLon = Math.sin(deltaLon / 2);

    const a = sinLat * sinLat +
        Math.cos(lat1) * Math.cos(lat2) *
        sinLon * sinLon;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c; // distancia en metros
};

// Global Snapping Helper (Pixel-based)
export const findSnapPoint = (lng, lat, tramos, map, radiusPx = 20) => {
    if (!map) return null;
    const clickPx = map.project([lng, lat]);

    let bestSnap = null;
    let minPxDist = radiusPx;

    tramos.forEach(tramo => {
        if (!tramo.visible) return;
        tramo.coordinates.forEach(coord => {
            const coordPx = map.project(coord);
            const dist = Math.sqrt(Math.pow(clickPx.x - coordPx.x, 2) + Math.pow(clickPx.y - coordPx.y, 2));
            if (dist < minPxDist) {
                minPxDist = dist;
                bestSnap = [...coord];
            }
        });
    });

    return bestSnap;
};
