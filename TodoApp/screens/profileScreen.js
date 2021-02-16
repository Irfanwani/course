import React from 'react'
import {View, Text, TextInput, StyleSheet, Button, ToastAndroid} from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/Ionicons'

export default class profileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isDis: true
        }
    }

    static navigationOptions = {
        tabBarIcon: ({focused, tintColor}) => (
            <Icon
                name={`person${focused ? '' : '-outline'}`}
                size={25}
                color={tintColor}
            />
        )
    }

    updateUsername = username => {
            this.setState({
                username: username
            }, this.applyChanges);
    }

    updatePassword = password => {
            this.setState({
                password: password
            }, this.applyChanges);
    }

    applyChanges = () => {
        if(this.state.username.length >= 3 && this.state.password.length >= 8) {
            this.setState({
                isDis: false
            })
        }else {
            this.setState({
                isDis: true
            })
        }
    }

    saveChanges = () => {
        this.props.navigation.dangerouslyGetParent().setParams({name: this.state.username, password: this.state.password});
        this.props.navigation.navigate('firstStack', { name: this.state.username });
        this.setState({
            username: '',
            password: '',
            isDis: true
        })
        ToastAndroid.show('Profile Updated Successfully!', ToastAndroid.SHORT);

    }

    render() {
        return (
            <View style={{paddingTop: Constants.statusBarHeight, flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 48, color: 'teal'}}>Profile</Text>

                <Text style={{color: 'indigo'}}><Icon name='person' size={25} color='teal' /> {this.props.navigation.dangerouslyGetParent().getParam('name').toUpperCase()}</Text>

                <Text style={{color: 'indigo'}}><Icon name='lock-closed' size={25} color='teal' /> {this.props.navigation.dangerouslyGetParent().getParam('password').toUpperCase()}</Text>
                
                <Text style={{fontSize: 15, color: 'teal', marginTop: 20}}>Change username and/or password</Text>
                <View style={styles.input}>
                    <Icon name='person' size={25} color='teal' />
                    <TextInput value={this.state.username} placeholder='Username' onChangeText={this.updateUsername} />
                </View>
                <View style={styles.input}>
                    <Icon name='lock-closed' size={25} color='teal' />
                    <TextInput value={this.state.password} placeholder='Password' onChangeText={this.updatePassword} secureTextEntry />
                </View>

                <Button title='Save Changes' onPress={this.saveChanges} disabled={this.state.isDis} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'teal',
        borderRadius: 20,
        paddingHorizontal: 100,
        paddingVertical: 5,
        marginVertical: 20,
        flexDirection: 'row',
    }
})