import { useState, useEffect } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    permissionGrated: false,
    coordinates: { latitude: undefined, longitude: undefined },
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
    const newCoords = JSON.stringify({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    localStorage.setItem("coords", newCoords);
  };

  const onError = (error) => {
    setLocation({
      permissionGrated: false,
      error: error,
    });
  };

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      result.state === "granted" &&
        setLocation((prevState) => {
          return { ...prevState, permissionGrated: true };
        });
    });
    const cachedCoords = localStorage.getItem("coords");
    if (cachedCoords) {
      const { latitude, longitude } = JSON.parse(cachedCoords);
      setLocation({
        permissionGrated: true,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 18000000,
      });
    }
  }, []);

  return location;
};
