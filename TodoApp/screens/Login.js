import React from 'react'
import { View, StyleSheet, Text, Button, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => `${navigation.getParam('name')}`,
            headerTintColor: 'teal',
            headerStyle:  {
                backgroundColor: 'skyblue',
            }
        }
    }
    constructor() {
        super();
        this.state = {
            isDisabled: true,
            username: '',
            password: ''
        }
    }

    takeUsername = username => {
        this.setState({username}, this.isValid)
    }

    takePassword = password => {
        this.setState({password}, this.isValid)
    }

    isValid = () => {
        if(this.state.username.length >= 3 && this.state.password.length >= 8) {
            this.setState({
                isDisabled: false
            })
        }else {
            this.setState({
                isDisabled: true
            })
        }
    }

    visitSite = () => {
        this.props.navigation.navigate('secondSwitch', {name: this.state.username, password: this.state.password});
        ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
    }
    
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.input}>
                    <Icon name='person' size={25} color='teal' />
                    <TextInput value={this.state.username} onChangeText={this.takeUsername} placeholder="Username" />
                </View>
                <View style={styles.input}>
                    <Icon name='lock-closed' size={25} color='teal' />
                    <TextInput value={this.state.password} onChangeText={this.takePassword} placeholder="Password" secureTextEntry />
                </View>
                <Button title='Login' onPress={this.visitSite} disabled={this.state.isDisabled} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        flexDirection: 'row',
        paddingHorizontal: 100,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'teal',
    }
})