'use client';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw'; 
import * as turf from '@turf/turf';
import { headers } from 'next/headers';



export default function MapaLeafletInner() {
  useEffect(() => {
    const mapId = 'mapid';
    


    const existingMapContainer = document.getElementById(mapId);
    if (existingMapContainer) {
      const container = existingMapContainer as HTMLElement & { _leaflet_id?: string };
      if (container._leaflet_id) {
        container._leaflet_id = undefined;
      }
    }

    fetch('/api/terreno') 
    .then((res) => res.json())
    .then((data) => {
      data.forEach((terreno: any) => { 
        const layer = L.geoJSON(terreno.geometria); // suponiendo que geometria es GeoJSON 
        layer.addTo(drawnItems);
      });
    });

    const map = L.map(mapId).setView([-33.45, -70.66], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // @ts-ignore porque L.Control.Draw no está tipado oficialmente
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
    });

    map.addControl(drawControl);

    map.on('draw:created', function (e: any) {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      console.log('Polígono:', layer.toGeoJSON());
    });

    map.locate({ setView: true, maxZoom: 16 });

    map.on('locationfound', (e: L.LocationEvent) => {
      // Marcador en la ubicación
      L.marker(e.latlng).addTo(map)
        .bindPopup('¡Estás aquí!')
        .openPopup();

    // Círculo de precisión
    L.circle(e.latlng, { radius: e.accuracy }).addTo(map);
    });

    map.on('locationerror', () => {
      alert('No se pudo obtener tu ubicación.');
    });

    map.on('draw:created', function (e: any) {
      const layer = e.layer;
      drawnItems.addLayer(layer);
    
      const geojson = layer.toGeoJSON();
      const area = turf.area(geojson); // en metros cuadrados
      const areaHa = area / 10000; // en hectáreas
      
      fetch('/api/terreno', {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          areaHectareas: areaHa,
        }) 

      })
    
      console.log(`Área: ${area.toFixed(2)} m² (${areaHa.toFixed(2)} ha)`);
    
      // Puedes mostrarlo en el mapa
      layer.bindPopup(`Hectareas: ${areaHa.toFixed(2)} m²`).openPopup();
    });
      

  
    return () => {
      map.remove();
    };
  }, []);

  return <div id="mapid" style={{ height: '400px', width: '400px' }} />
;

}
