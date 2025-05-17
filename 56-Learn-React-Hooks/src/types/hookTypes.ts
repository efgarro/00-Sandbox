export type F = () => void;

export interface IToggleDemoProps {
  isOn: boolean;
  toggle: F;
}

interface GeolocationCoordinates {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number | null;
}

export interface IGeoState extends GeolocationPosition {
  loading: boolean;
  error: GeolocationPositionError | null;
}

export interface GeolocationPositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

export interface IGeolocationPositionOptions {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
}
