import { MapContainer, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';

const CityMap = ({ name }) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const cityRef = doc(db, "cities", name);

  useEffect (() => {

    const getCity = async () => {
      try {
        const data = await getDoc(cityRef);
        
        const filteredData = data.data();

        setLat(filteredData.latitude);
        setLng(filteredData.longitude);
      } catch (error) {
        console.log(error);
      }
      
    }

      getCity();
    } 
  )

  if (!lat || !lng) {
    return <></>
  }
  return (
    <MapContainer center={[lat,lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

CityMap.propTypes = {
  name: PropTypes.string
}

export default CityMap

