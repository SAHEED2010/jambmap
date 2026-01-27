export interface JambCenter {
  sn: number;
  state: string;
  town: string;
  centre_name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  distance?: number;
}
