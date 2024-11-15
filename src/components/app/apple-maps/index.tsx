"use client";

import { cn } from "@/lib/utils";
import { Annotation, Map, Marker } from "mapkit-react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";
import UserLocation from "./user-location";

interface MapsProps {
  token: string;
  className?: string;
  coordinatesArray: {
    lat: number;
    lng: number;
    type: "box1" | "box2" | "box3";
  }[];
  enableUserLocation?: boolean;
  disableBodyScroll?: boolean;
  paddingBottom?: number;
}

const AppleMaps: React.FC<MapsProps> = ({
  token,
  coordinatesArray,
  className,
  enableUserLocation = false,
  disableBodyScroll = false,
  paddingBottom,
}) => {
  const [mounted, setMounted] = useState(false);
  const [centerCoordinates, setCenterCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  }>();
  const [accurateLocation, setAccurateLocation] = useState(false);
  const [cookies, setCookie] = useCookies(["user-location"]);
  const [applyRestriction, setApplyRestriction] = useState(true);

  useLayoutEffect(() => {
    setMounted(true);
    if (!enableUserLocation) return;

    const cachedLocation = cookies["user-location"];
    if (cachedLocation) {
      setUserCoordinates(cachedLocation);
    } else {
      try {
        (async () => {
          const ipResponse = await fetch("https://ipapi.co/json/");
          const ipData = await ipResponse.json();
          const { latitude, longitude } = ipData;
          setUserCoordinates({ lat: latitude, lng: longitude });
          setCookie(
            "user-location",
            JSON.stringify({ lat: latitude, lng: longitude }),
            {
              path: "/",
              maxAge: 60 * 60 * 24, // 24 hours
            },
          );
        })();
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableUserLocation]);

  useEffect(() => {
    if (disableBodyScroll) {
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.touchAction = "auto";
      };
    }
  }, [disableBodyScroll]);

  useEffect(() => {
    if (userCoordinates) {
      setCenterCoordinates(userCoordinates);
      setApplyRestriction(true);

      const timeout = setTimeout(() => {
        setApplyRestriction(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [userCoordinates]);

  const updateUserLocation = useCallback(
    (coordinates: { lat: number; lng: number }) => {
      setUserCoordinates(coordinates);
      setAccurateLocation(true);
    },
    [],
  );

  return (
    <div
      className={cn(
        `relative h-56 w-full items-center justify-center`,
        className,
      )}
    >
      {mounted && (
        <Map
          token={token}
          paddingBottom={paddingBottom ?? undefined}
          showsCompass={0}
          showsMapTypeControl={false}
          cameraBoundary={{
            centerLatitude: centerCoordinates.lat,
            centerLongitude: centerCoordinates.lng,
            latitudeDelta: applyRestriction ? 0.001 : 365,
            longitudeDelta: applyRestriction ? 0.001 : 365,
          }}
          maxCameraDistance={
            applyRestriction ? (enableUserLocation ? 10000 : 100000) : undefined
          }
          minCameraDistance={
            applyRestriction ? (enableUserLocation ? 10000 : 100000) : undefined
          }
        >
          {coordinatesArray
            ? coordinatesArray.map((coordinates) => (
                <Marker
                  key={`coordinate-${JSON.stringify(coordinates)}`}
                  latitude={coordinates.lat}
                  longitude={coordinates.lng}
                />
              ))
            : null}

          {userCoordinates && (
            <Annotation
              latitude={userCoordinates.lat}
              longitude={userCoordinates.lng}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                {accurateLocation ? (
                  <div className="animate-expand-contract h-3.5 w-3.5 rounded-full bg-[#007AFF]"></div>
                ) : (
                  <div className="h-3.5 w-3.5 rounded-full bg-gray-500"></div>
                )}
              </div>
            </Annotation>
          )}
        </Map>
      )}
      {enableUserLocation && (
        <UserLocation setUserCoordinates={updateUserLocation} />
      )}
    </div>
  );
};

export default AppleMaps;
