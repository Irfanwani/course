import React from 'react'
import {View, Text} from 'react-native'

export default class detailScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Todo details',
            headerTintColor: 'purple'
        }
    }
    render() {
        return (
            <View>
                <Text>
                    Here are the details of the todos
                </Text>
            </View>
        )
    }
}