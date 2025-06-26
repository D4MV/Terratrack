'use client';
import { useEffect } from 'react';
import L from 'leaflet';

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

    const map = L.map(mapId).setView([-33.45, -70.66], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="mapid" style={{ height: '400px', width: '400px' }} />;
;

}
