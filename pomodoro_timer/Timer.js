import React from 'react'
import {View, TextInput, Text, Button, StyleSheet, Vibration, Dimensions} from 'react-native'
import ProgressBar from './progressbar'

const wt = 'WORK TIMER'
const bt = 'BREAK TIMER'
let interval;

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: wt,
            workMins: 25,
            workSecs: 0,
            breakMins: 5,
            breakSecs: 0,
            mins: 25,
            secs: 0,
            running: false
        }

    }

    changeTime = () => {
        if(this.state.title == wt) {
            this.setState({mins: this.state.workMins, secs: this.state.workSecs})
        }else {
            this.setState({mins: this.state.breakMins, secs: this.state.breakSecs})
        }
    }

    componentDidMount() {
        this.changeTime();
    }
    
    stop = () => {
        this.setState({running: false})
        clearInterval(interval);
    }

    changeWorkMins = workMins => {
        this.setState({workMins}, this.changeTime) 
        this.stop()
    }

    changeWorkSecs = workSecs => {
        this.setState({workSecs}, this.changeTime) 
        this.stop()
    }
    
    changeBreakMins = breakMins => {
        this.setState({breakMins}, this.changeTime)
        this.stop()
    }

    changeBreakSecs = breakSecs => {
        this.setState({breakSecs}, this.changeTime)
        this.stop()
    }


    ticker = () => {
 
        if(this.state.running) {
            interval = setInterval(() => {
                if(this.state.mins <= 0 && Math.round((this.state.secs * 10)) / 10 <= 0) {
                    Vibration.vibrate(500, 500, 500);
                    this.setState({title: this.state.title == wt ? bt : wt, mins: this.state.title == wt ? this.state.breakMins : this.state.workMins, secs: this.state.title == wt ? this.state.breakSecs : this.state.workSecs})
                }
        
                this.setState(prevState => ({secs: prevState.secs - 0.05}))
                if(this.state.secs < 0) {
                    this.setState(prevState=> ({secs: 59, mins: prevState.mins - 1}))
                }
            }, 50);

            
        }else {
            clearInterval(interval);
        }
    }
    

    switch = () => {
        this.setState(prevState => ({running: !prevState.running}), this.ticker);
    }

    reset = () => {
        this.stop()
        if(this.state.title == wt) {
            this.setState({
                mins: this.state.workMins,
                secs: this.state.workSecs
            })
        }
        else {
            this.setState({
                mins: this.state.breakMins,
                secs: this.state.breakSecs
            })
        }
    }


    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>{this.state.title}</Text>
                <View style={{alignItems: 'flex-start', backgroundColor: 'lightgrey', width: Dimensions.get('window').width}}>
                    <ProgressBar state={this.state} />
                </View>

                <Text style={styles.text}>{`${this.state.mins < 10 ? '0' : ''}${this.state.mins}:${Math.ceil(this.state.secs) < 10 ? '0' : ''}${Math.ceil(this.state.secs)}`}</Text>
                
                <View style={styles.innerView}>
                    <Button title={this.state.running ? 'Pause' : 'Start'} onPress={() => this.switch()} color='orange' />
                    <Button title='Reset' onPress={() => this.reset()} />
                </View>
                <View style={styles.innerView}>
                    <TextInput style={styles.input} onChangeText={this.changeWorkMins} value={null} placeholder='Work mins'keyboardType='numeric' />
                    <TextInput style={styles.input} onChangeText={this.changeWorkSecs} value={null} placeholder='Work secs' keyboardType='numeric' />
                </View>

                <View style={styles.innerView}>
                    <TextInput style={styles.input} onChangeText={this.changeBreakMins} value={null} placeholder='break mins' keyboardType='numeric' />
                    <TextInput style={styles.input} onChangeText={this.changeBreakSecs} value={null} placeholder='Break secs' keyboardType='numeric' />
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    input: {
        borderColor: 'teal',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 5,
        marginTop: 10
    },
    innerView: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 48
    }
})