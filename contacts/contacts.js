import React from 'react'
import {ActivityIndicator} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Login from './screens/Login'
import ContactsList from './screens/ContactsList'
import AddContacts from './screens/AddContacts'
import Profile from './screens/Profile'
import Icon from 'react-native-vector-icons/Ionicons'
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'

const stackNavigator = createStackNavigator({
    firstStack: ContactsList,
    secondStack: AddContacts
}, {
    initialRouteName: 'firstStack',
    navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name={`call${focused ? '' : '-outline'}`} size={25} color={tintColor} />
            ),
        tabBarLabel: 'Contacts',
    }
    
}
)


const tabNavigator = createBottomTabNavigator({
    firstTab: stackNavigator,
    secondTab: Profile
}, {
    initialRouteName: 'firstTab',
    tabBarOptions: {
        activeTintColor: 'brown',
        activeBackgroundColor: 'lightgrey'
    },


})

const switchNavigator = createSwitchNavigator({
    firstSwitch: Login,
    secondSwitch: tabNavigator
}, {
    initialRouteName: 'secondSwitch'
})

const AppContainer = createAppContainer(switchNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppContainer />
                </PersistGate>
            </Provider>
        )
    }
}