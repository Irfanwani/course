import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Learn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            location: null,
            myLocation: null
        }
    }

    getLocation = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status !== 'granted') {
            this.setState({error: 'Access denied!'})
            return;
        }
        let location = await Location.getCurrentPositionAsync({});

        let myLocation = (await Location.geocodeAsync('Arhama kangan ganderbal kashmir india'))[0];

        // let reverseGeocode = await Location.reverseGeocodeAsync(coordinates);

        this.setState({location, myLocation})
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        if(!this.state.location || !this.state.myLocation) {
            return (
                <View />
            );
        }
        return (
            <MapView style={{flex: 1}} 
                region={{
                    latitude: this.state.location.coords.latitude, 
                    longitude: this.state.location.coords.longitude, 
                    latitudeDelta: 0.922, 
                    longitudeDelta: 0.421
                }}>
                    <MapView.Marker title='Arhama' description="Located in J and K" coordinate={this.state.location.coords} />

                    <MapView.Marker title='Some other location' description="Located in J and K but i don't know where" coordinate={this.state.myLocation} pinColor='blue' />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})