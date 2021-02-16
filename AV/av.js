import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Audio, Video} from 'expo-av'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading'

class CatVideoButton extends React.Component {


    resetAsync = async () => {
        await this.video.stopAsync();
        await this.video.setPositionAsync(0);
    }

    playAsync = async () => {
        await this.video.replayAsync();
    }
    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => this.playAsync()}>
                    <View>
                <Video 
                source={{uri: this.props.source }}
                style={{
                    height: this.props.height || this.props.size || 300, 
                    width: this.props.width || this.props.size || 300
                }}
                shouldPlay={true}
                resizeMode='cover'
                ref={(c) => {this.video = c}}
                onPlaybackStatusUpdate={(st) => {
                    if(st.didJustFinish) {
                        this.resetAsync();
                    }
                }}

            />
            </View>
            </TouchableHighlight>
        </View>
        )
    }
}


export default class AudioVideo extends React.Component {
    // Here we can edit the way audio plays on android and ios e.g, what to do with the audio which is already playing, what to do on ios if it is on silent mode i.e, whether to play it in silent mode or not.
    // setAudioAsync = async () => {
    //     await Audio.setAudioModeAsync({
            
    //     })
    // }

    constructor(props) {
        super(props);
        this.state = {
            isReady: true
        }
    }

    render() {
        if(!this.state.isReady) {
            return (
                <AppLoading />
            )
        }
        let size = 100;
        return (
            <View style={styles.view}>
                <CatVideoButton source='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' size={size} />
                <CatVideoButton source='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' size={size} />
                <CatVideoButton source='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' size={size} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})