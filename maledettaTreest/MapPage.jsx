import { StyleSheet, Text, View, Image, Button, Alert, FlatList } from "react-native";
import { styles } from "./AppStyle";
import { Component, React } from "react"; 
import CommunicationController from './CommunicationController.jsx';
import LineaCard from "./LineaCard";
import PostCard from "./PostCard";
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

class MapPage extends Component{
    state = {
        stations:[],
        did: this.props.did,
        coordinates: [],
        location: {}
    }

    constructor(props){
        super(props);
        this.getStations();
        this.locationPermissionAsync()
    }
    

    getStations(){
        CommunicationController.getStations("kUfVLJyLqHKQN55S", this.state.did)
        .then((result) => {
            console.log("stations from network: " + result.stations)
            result.stations.forEach(station => {
                this.state.stations.push(station)
                this.state.coordinates.push({latitude: parseFloat(station.lat), longitude: parseFloat(station.lon)})
            });
            this.setState(this.state)
            console.log(this.state.coordinates)
        })
        .catch((error)=>{
            console.log("Errore: "+ error)
        })
    }

    async locationPermissionAsync() {
        let canUseLocation = false;
        const grantedPermission = await Location.getForegroundPermissionsAsync()
        if (grantedPermission.status === "granted") {
          canUseLocation = true;
        } else {
          const permissionResponse = await Location.requestForegroundPermissionsAsync()
          if (permissionResponse.status === "granted") {
            canUseLocation = true;
          }
     }
     if (canUseLocation) {
        const location = await Location.getCurrentPositionAsync()
        console.log("received location "+ location)
        this.state.location = {latitude: location.coords.latitude, longitude: location.coords.longitude}
        this.setState(this.state)
        console.log(this.state.location)
        this.render();
    }
    }

    //visualizzazione
    render(){
        return(
            <View style= {styles.container}>
                <View style= {styles.button}>
           <Button
        title="Back"
        onPress={this.props.onPressBack}
      />
      </View>
      
            <View style={styles.containerMap}>
                <MapView style = {styles.map}
                initialRegion = {{latitude: 45.464211, longitude: 9.191383, latitudeDelta: 0.3, longitudeDelta: 0.3}}
                >
                {this.state.stations.map(station => <Marker  coordinate={{latitude: parseFloat(station.lat), longitude: parseFloat(station.lon)}} title= {station.sname}></Marker>)} 
                <Marker coordinate={{latitude: this.state.location.latitude, longitude: this.state.location.longitude}} pinColor = "blue"></Marker>
                <Polyline coordinates = {this.state.coordinates.map(coordinate => ({latitude: coordinate.latitude, longitude: coordinate.longitude}))} strokeColor= "red" strokeWidth={3}/>   
                </MapView>
            </View>
            </View>
        )
    }
    }

export default MapPage;