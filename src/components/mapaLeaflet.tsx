'use client';
import dynamic from 'next/dynamic';

const MapaLeafletInner = dynamic(() => import('./MapaLeafletInner'), { ssr: false });

export default function MapaLeaflet() {
  return <MapaLeafletInner />;
}
