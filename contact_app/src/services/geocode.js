import { googleMapsApiKey } from "./apiKeys";

export default async function geocode(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleMapsApiKey}`;
    console.log('Chamando API de Geolocalização');
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
        const result = data.results[0];
        const latitude = result.geometry.location.lat;
        const longitude = result.geometry.location.lng;
        return { latitude, longitude };
    } else {
        throw new Error('Falha ao obter as coordenadas do endereço.');
    }
}