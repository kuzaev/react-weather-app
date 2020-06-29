import { useState, useEffect } from "react";

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError("Геолокация не поддреживается браузером");
      return;
    }

    geo.getCurrentPosition((position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

  }, []);

  return { ...position, error };
};
