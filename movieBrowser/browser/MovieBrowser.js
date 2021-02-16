import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../movieScreens/search'
import Login from '../movieScreens/Login'
import SettingsTab from '../movieScreens/settings'
import MoreDetails from '../movieScreens/details'
import Icon from 'react-native-vector-icons/Ionicons'

const stackNavigator = createStackNavigator({
    firstStack: Search,
    secondStack: MoreDetails
}, {
        initialRouteName: 'firstStack'
    }
)

stackNavigator.navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
        <Icon name={`albums${focused ? '' : '-outline'}`} size={25} color={tintColor} />
    ),
    tabBarLabel: 'Movies'
}

const tabNavigator = createBottomTabNavigator({
    firstTab: stackNavigator,
    secondTab: SettingsTab
},{
    initialRouteName: 'firstTab',
    tabBarOptions: {
        activeTintColor: 'brown',
        activeBackgroundColor: 'lightgrey'
    }
} 
)

const switchNavigator = createSwitchNavigator({
    firstSwitch: Login,
    secondSwitch: tabNavigator
}, {
    initialRouteName: 'firstSwitch'
}
)

const AppContainer = createAppContainer(switchNavigator);

export default class MovieBrowser extends React.Component {
    render() {
        return (
            <AppContainer />
        )
    }
}