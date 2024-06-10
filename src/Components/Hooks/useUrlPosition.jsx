import { useSearchParams } from "react-router-dom";

export function useUrlGeolacation() {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
