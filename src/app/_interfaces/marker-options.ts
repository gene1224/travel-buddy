export interface MarkerOption {
  origin: Marker;
  waypoints?: Marker[];
  destination: Marker;
}

export interface Marker {
  infoWindow: string;
  icon: string;
}
