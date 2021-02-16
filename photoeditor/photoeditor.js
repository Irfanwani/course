import React from 'react'
import {View, StyleSheet, Image, Button, TouchableHighlight, Text} from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenImage: null,
            takenImage: null,
            customCamera: false,
            cameraType: Camera.Constants.Type.back,
        }
    }

    componentDidMount() {
        this.customCameraAsync();
    }

    cameraRollAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if(status !== 'granted') {
            console.log('Camera roll permission denied!');
            return;
        }
        let img = await ImagePicker.launchImageLibraryAsync();
        this.setState({chosenImage: img});
    }

    launchCameraAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        if(status !== 'granted') {
            console.log('Camera permission denied!');
            return;
        }
        let img = await ImagePicker.launchCameraAsync({allowsEditing: true});

        let flippedImage = await ImageManipulator.manipulateAsync(img.uri, [{flip: ImageManipulator.FlipType.Horizontal}])
        this.setState({takenImage: flippedImage});
    }

    customCameraAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA);
        if(status !== 'granted') {
            console.log('Custom camera permission denied!')
            return;
        }

        this.setState({customCamera: true})
    }

    render() {
            return (
                <View style={styles.view}>
                    <Button title='Launch Camera Roll' onPress={() => this.cameraRollAsync()} />
                    <Button title='Launch Camera' onPress={() => this.launchCameraAsync()} />

                    {(this.state.customCamera && (
                        <TouchableOpacity onPress={() => {
                            if(this.state.cameraType == Camera.Constants.Type.back) {
                                this.setState({cameraType: Camera.Constants.Type.front})
                            }else {
                                this.setState({cameraType: Camera.Constants.Type.back})
                            }
                            }}>
                            <Camera style={{width: 400, height: 400}} type={this.state.cameraType} />
                        </TouchableOpacity> 
                    ) || null)}

                    {(this.state.chosenImage && (<Image source={{uri: this.state.chosenImage.uri}} style={{height: 200, width: 200}} />) || null)}
                    {(this.state.takenImage && (<Image source={{uri: this.state.takenImage.uri}} style={{height: 200, width: 200}} />) || null)}
                </View>
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