import { useEffect, useState } from "preact/hooks";

interface Cordinates {
  coordinates: { latitude?: string; longitude?: string };
  breweryName?: string;
}

export default function MapContainer(
  { coordinates: { latitude: lat, longitude: lng }, breweryName }: Cordinates,
) {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mapUrl = await fetch(
          `http://localhost:8080/generateMap?lat=${lat}&lng=${lng}`,
        );
        setMapUrl(await mapUrl.json());
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div class="skeleton">
      <img src={mapUrl} />
    </div>
  );
}
