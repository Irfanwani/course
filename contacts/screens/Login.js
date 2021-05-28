import React from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'
import {styles} from '../styles'
import {login} from '../redux/actions'
import {connect} from 'react-redux'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    static navigationOptions = {
        headerTitle: 'Login'      
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if(nextProps.token) {
    //         this.props.navigation.navigate("secondSwitch")
    //     }
    // }

    validateForm = () => {
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.error}>{this.props.err}</Text>
                <TextInput style={styles.input} value={this.state.username} onChangeText={username => this.setState({username})} placeholder='Username' />
                <TextInput style={styles.input} value={this.state.password} onChangeText={password => this.setState({password})} placeholder='Password' secureTextEntry />
                <Button color="teal" title='Login' onPress={() => this.validateForm()} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    err: state.user.error
})

export default connect(mapStateToProps, {login})(Login)