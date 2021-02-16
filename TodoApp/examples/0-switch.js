import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'


class ScreenNameOne extends React.Component {
    render() {
        return (
            <View style={styles.view1}>
                <Button title='go to screen two' onPress={() => this.props.navigation.navigate('SecondPage')} />
            </View>
        )
    }
}

class ScreenNameTwo extends React.Component {
    render() {
        return (
            <View style={styles.view2}>
                <Button title='go to screen one' onPress={() => this.props.navigation.navigate('FirstPage')} />
            </View>
        )
    }
}

const AppNavigator = createSwitchNavigator({
    FirstPage: ScreenNameOne,
    SecondPage: ScreenNameTwo,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 25,
        borderColor: 'teal',
    },

    view2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 25,
        borderColor: 'orange',
    }
})