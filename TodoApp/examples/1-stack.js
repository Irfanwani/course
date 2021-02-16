import React from 'react'
import { BackHandler, View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/Ionicons'

function randomNumber() {
   return Math.floor(Math.random() * 10);
}

class ScreenNameOne extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    // Disabling android back button
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        this.props.navigation.navigate('home')
        return true;
    }


    static navigationOptions = {
        drawerLabel: 'first',
        drawerIcon: ({tintColor}) => {
            <Icon name='options' size={30} color='green' />
        }
    }
    render() {
        return (
            <View style={styles.view1}>
                <Button title='go to screen two' onPress={() => this.props.navigation.navigate('SecondPage')} />
                <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='options' size={25} color='orange' />
                </TouchableOpacity>
            </View>
        )
    }
}

class ScreenNameTwo extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: 'Second',
            drawerIcon: ({tintColor}) => {
                <Icon name='albums' size={30} color='green' />
            }
        }
    }
    render() {
        return (
            <View style={styles.view2}>
                <Button title='go to screen three' onPress={() => {this.props.navigation.navigate('ThirdPage', {
                    number: randomNumber(),
                })}} />
            </View>
        )
    }
}

class ScreenNameThree extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {            
            drawerLabel: 'Counter',
            drawerIcon: ({tintColor}) => {
                <Icon name='time' size={30} color='green' />
            }
        }
    }
    render() {
        return (
            <View style={styles.view3}>
                <Text style={{fontSize: 25}}>{this.props.navigation.getParam('number')}</Text>
                <Button title='Get number' onPress={() => this.props.navigation.setParams({number: randomNumber() })} />
                <Button title='Go Back' onPress={() => this.props.navigation.goBack()} />
            </View>
        )
    }
}

class FourthPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => {
                <Icon name='home' size={30} color='green' />
            }
        }
    }
    render() {
        return (
            <View style={styles.view3}>
                <Text style={{fontSize: 25}}>This is forth screen and first drawer</Text>
                <Button title='next' onPress={() => this.props.navigation.navigate('notification')} />
            </View>
        )
    }
}

class FifthPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel: 'Notifications',
            drawerIcon: ({tintColor}) => {
                <Icon name='notifications' size={30} color='green' />
            }
        }
    }
    render() {
        return (
            <View style={styles.view3}>
                <Text style={{fontSize: 25}}>This is fifth screen and second drawer</Text>
            </View>
        )
    }
}

// const AppNavigator = createStackNavigator({
//     FirstPage: ScreenNameOne,
//     SecondPage: ScreenNameTwo,
//     ThirdPage: ScreenNameThree,
// });

const drawer = createDrawerNavigator({
    FirstPage: ScreenNameOne,
    SecondPage: ScreenNameTwo,
    ThirdPage: ScreenNameThree,
    home: FourthPage,
    notification: FifthPage
})

const AppContainer = createAppContainer(drawer);

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
    },

    view3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 25,
        borderColor: 'violet',
    },
    
})