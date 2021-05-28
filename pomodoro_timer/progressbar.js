import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
    progress: {
        height: 10,
    }
})

export default class ProgressBar extends React.Component {
    render() {
        const {props} = this
        const {width} = Dimensions.get('window')
        const divisor = (props.state.title == 'WORK TIMER' ? ((props.state.workMins * 60) + Math.ceil(props.state.workSecs)) : ((props.state.breakMins * 60) + Math.ceil(props.state.breakSecs)));
        const percent = ((props.state.mins * 60) + (props.state.secs)) / (divisor == 0 ? Infinity : divisor);
        
        return (
            <View style={[styles.progress, {width: width - (width * percent), backgroundColor: props.state.title == 'WORK TIMER' ? 'blue' : 'orange'}]} />
            
        )
    }
    
    // Animated applied here. Remember to initialize the width first 
    // Also apply these styles:
    // {transform : [{scaleX: this.state.percent.interpolate({
    //     inputRange: [0, 100],
    //     outputRange: [0, width]
    // })}]


    //  state = {
    //     percent: new Animated.Value(0)
    // }

    // componentDidMount() {
    //     this.animation = Animated.timing(
    //         this.state.percent,
    //         {
    //             toValue: 100,
    //             duration: ,
    //             easing: Easing.linear,
    //             useNativeDriver: true
    //         }
    //     )
    //     this.animation.start()
    // }
}