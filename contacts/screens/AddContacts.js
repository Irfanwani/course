import React from 'react'
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native'
import {styles} from '../styles'
import CL from '../contactsData'
import store from '../redux/store'
import {addContact} from '../redux/actions' 
import {connect} from 'react-redux'

class AddContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            error: ''
        }
    }
    
    static navigationOptions = {
        headerTitle: 'Add Contact',
        headerTintColor: 'teal'
    }

    handleName = username => {
        this.setState({username})
    }

    handlePhone = phone => {
        this.setState({phone})
    }

    validateForm = () => {
        if(this.state.username.length >= 3 && this.state.phone.length == 10) {
            this.props.addContact({name: this.state.username, number: this.state.phone})
            ToastAndroid.show('Contact Added!', ToastAndroid.SHORT);
            this.props.navigation.navigate('firstStack')
        }else {
            this.setState({error: 'Please provide valid credentials!'})
        }
    }


    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.error}>{this.state.error}</Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={this.handleName} placeholder='Name' />
                <TextInput style={styles.input} value={this.state.phone} onChangeText={this.handlePhone} placeholder='Phone' keyboardType='numeric' />
                <Button title='Add Contact' onPress={() => this.validateForm()} />
            </View>
        )
    }
}


export default connect(null, {addContact: addContact})(AddContacts)