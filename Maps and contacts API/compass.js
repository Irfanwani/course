import React from 'react'
import {View, Text, StyleSheet, ImageBackground, Image, ActivityIndicator, Dimensions} from 'react-native'
import {Magnetometer, DeviceMotion} from 'expo-sensors'

export default class Compass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        }
    }

    // Compass functionality
    magnetometerAsync = async () => {
        Magnetometer.addListener((v) => {
            this.setState({v});
        })
    }

    // Detecting motion of a device
    deviceMotionAsync = async () => {
        DeviceMotion.addListener((dm) => {
            this.setState({dm})
        })

        DeviceMotion.setUpdateInterval(16);
    }

    componentDidMount() {
        // this.magnetometerAsync();
        this.deviceMotionAsync();
        console.log("Is available \n",DeviceMotion.isAvailableAsync());
    }

    render() {
        // Calculating the relation between coordinates and the compass-needle angle
        let theta = '0rad';
        if(this.state.v) {
            let {x, y, z} = this.state.v;
            theta = Math.atan(-x/y);
            if(-x > 0 && y > 0) {
                //
            }
            else if(y > 0) {
                theta = Math.PI;
            }else {
                theta = Math.PI * 2;
            }
        }

        // Calculating the angle of rotation for the image for motion detection
        let angle = 0;
        if(this.state.dm && this.state.dm.rotation) {
            angle = -this.state.dm.rotation.gamma;
            return (
                <View style={styles.view}>
                    <Text>Angle: {angle}</Text>
                    <Image source={require('./ballon.jpg')} resizeMode='contain' style={{transform: [{rotate: `${angle}rad`}]}} />
                </View>
            )
        }

        if(this.state.v) {
            return (
                <View style={styles.view}>
                <Text>Theta: {theta}</Text>
                <ImageBackground 
                    source={require('./compass-face.png')} 
                    style={{height: 320, width: 320, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('./compass-needle.png')} style={{height: 420, width: 420, opacity: 0.8, transform: [{rotate: `${theta}rad`}]}} />
                </ImageBackground>
            </View>
            )
        } return <View style={styles.view}><ActivityIndicator color='teal' size='large' /></View>
        
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
         alignItems: 'center'
    }
})