import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SettingsTab extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <Icon
                name={`options${focused ? '' : '-outline'}`}
                size={25}
                color={tintColor}
            />
        ),
        tabBarLabel: 'Settings'

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>This is settings tab</Text>
            </View>
        )
    }
}