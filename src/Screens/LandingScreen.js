import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Button, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';

const LandingScreen = () => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width/height;
  const northeastLat = 5.596966;
  const southwestLat = 5.215522;
  const latDelta = northeastLat - southwestLat;
  const lngDelta = latDelta * ASPECT_RATIO;
  const [markers, setMarkers] = useState([]);
  const [data, setData] = useState([]);
  const [button, showButton] = useState(false);
  const [region, setRegion] = React.useState({
    latitude: 5.394306,
    longitude: -3.955375,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  });

  useEffect(() => {
    fetchData();
    console.log(region)
    console.log(button)
  }, []);

  const fetchData = () => {
    axios.get('https://staging.api.bigcity.bfedition.com/api/core/data/cache/places')
      .then(response => {
        setData(response.data.data);
        fetchMarkers(response.data.data);
      }) 
      .catch(error => {
        console.log(error);
      });
  }

  //function to fetch markers on location change
  const fetchMarkers = (res) => {
    var myArrayDistance = [];
    //To calculate the distance between the current region and all markers
    for(let i=0; i<res.length;i++) {
      myArrayDistance.push(calculateDistance(region.latitude, region.longitude, res[i].address.lat, res[i].address.lng));
    }
    //To assign the distance between the current region and all the markers in the array of markers
    for(let i=0; i<res.length;i++) {
      res[i].distance = myArrayDistance[i];
    }
    //function to sort the array depending of the distance
    //the sort is in ascending order since we want the nearest markers 
    res.sort(compare);
    setMarkers(res);
  }


  //function to compare the distance between points of the markers
  const compare = (a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance){
      return 1;
    }
    return 0;
  }
  
  //function to calculate the distance between the current user loaction
  //and all the other locations
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; 
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  //function to convert degree to radian
  const toRad = (Value) => {
    return Value * Math.PI / 180;
  }

  const onRegionChange = (region) => {
    setRegion(region)
    showButton(true);
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChange={onRegionChange}
        style={StyleSheet.absoluteFillObject}
      >
        {markers.slice(0,50).map((marker, index) => (
        <Marker
          key={index}
          coordinate={{latitude:parseFloat(marker.address.lat), longitude:parseFloat(marker.address.lng)}}
          title={marker.slug}
          description={marker.address.city.name}
        />
        ))}
      </MapView>
      {button !== false ? 
        <TouchableOpacity style={styles.button} onPress={() => fetchMarkers(data)}>
          <Text>Search in this area</Text>
        </TouchableOpacity> 
      : 
        null
      } 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  button:{
    position: 'absolute', 
    top:'20%', 
    left:'30%', 
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding:10,
    borderWidth:1,
    borderColor:'#000',
    borderRadius:5
  }
});

export default LandingScreen;
