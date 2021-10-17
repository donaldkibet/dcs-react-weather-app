import { useState, useEffect } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    permissionGrated: false,
    coordinates: { latitude: "", longitude: "" },
    error: null,
  });

  const onSuccess = (location) => {
    setLocation({
      permissionGrated: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      permissionGrated: true,
      error: error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((prevState) => ({
        ...prevState,
        permissionGrated: false,
        error: {
          code: 500,
          message: "Geo location not supported",
        },
      }));
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 300000,
      });
    }
  }, []);

  return location;
};
