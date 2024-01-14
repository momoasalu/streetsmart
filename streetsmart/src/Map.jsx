
import {APIProvider, Map } from '@vis.gl/react-google-maps';


const CityMap = ({lat, lng}) => {
  return (
    <APIProvider apiKey="AIzaSyDtCaRBM8il9aQjoL0huqLAa6zKImeaFSo">
    <Map
      zoom={10}
      center={{lat, lng}}
      style={
        {
        height: "300px",
        width: "100%",
        margin: "auto"
      }}
    />
    </APIProvider>
  );
}

export default CityMap

