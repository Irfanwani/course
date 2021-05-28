import React from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class ContactsList extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Profile',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name={`person${focused ? '' : '-outline'}`} size={25} color={tintColor} />
        )
    }
    render() {
        return (
            <View>
                <Text>
                    Profile goes here!
                </Text>
            </View>
        )
    }
}