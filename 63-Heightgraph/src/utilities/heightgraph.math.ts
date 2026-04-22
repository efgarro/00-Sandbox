import { LatLng } from '../types/heightgraph.types';

export const calculateDistance = (ptA: LatLng, ptB: LatLng): number => {
  const R = 6371000; // Earth radius in meters
  const dLat = ((ptB.lat - ptA.lat) * Math.PI) / 180;
  const dLng = ((ptB.lng - ptA.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((ptA.lat * Math.PI) / 180) *
      Math.cos((ptB.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const randomNumber = (max: number): number =>
  Math.round(Math.random() * max);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);