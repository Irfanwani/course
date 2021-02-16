import React from 'react'
import { StyleSheet } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Login from '../screens/Login'
import MainTab from '../screens/MainTab'
import detailScreen from '../screens/detailScreen'
import profileScreen from '../screens/profileScreen'
import AddTodoScreen from '../screens/AddTodoScreen'
import Icon from 'react-native-vector-icons/Ionicons'

const stackNavigator = createStackNavigator({
    firstStack: MainTab,
    secondStack: detailScreen,
    AddTodo: AddTodoScreen,
}, {
    initialRouteName: 'firstStack',
})

stackNavigator.navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
        <Icon
            name={`albums${focused ? '' : '-outline'}`}
            size={25}
            color={tintColor}
        />
    )
}

const tabNavigator = createBottomTabNavigator({
    Todos: stackNavigator,
    Profile: profileScreen
},{
    initialRouteName: 'Todos',
    tabBarOptions: {
        activeTintColor: 'brown'
    }
})

const switchNavigator = createSwitchNavigator({
    firstSwitch: Login,
    secondSwitch: tabNavigator
})

const AppContainer = createAppContainer(switchNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})