import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Theme } from "./Theme";
import styles from "./Map.module.scss";
import { LocationType } from "../../redux/jobSlice";

interface MapOptions {
  panControl: boolean;
  zoomControl: boolean;
  mapTypeControl: boolean;
  scaleControl: boolean;
  streetViewControl: boolean;
  rotateControl: boolean;
  clickableIcons: boolean;
  fullscreenControl: boolean;
  keyboardShortcuts: boolean;
  scrollwheel: boolean;
  styles: any;
}

const defaultOptions: MapOptions = {
  panControl: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  fullscreenControl: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  styles: Theme,
};

interface MapProps {
  center: LocationType;
}

const containerStyle = {
  width: "300px",
  height: "175px",
};

const Map: React.FC<MapProps> = (props: MapProps) => {
  const { center } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAIzLyy4E4BOyVowNMi850bDZK3Bo2dgyE",
  });
  console.log("renderMap");
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={styles.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        <MarkerF onLoad={onLoad} position={center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(Map);
