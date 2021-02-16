import React from 'react'
import { View, TextInput, Button, Text, StyleSheet, ToastAndroid } from 'react-native'

export let todoList = require('../examples/todos');

export default class AddTodoScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            newTodo: '',
            isDis: true,
            id: todoList.default.length
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => <Text style={{color: 'brown', fontSize: 20}}>Add a Todo</Text>,
            headerTintColor: 'brown',
        }
    }


    handleNewTodo = todo => {
        this.setState({
            newTodo: todo
        })
        if(todo.length >= 10) {
            this.setState({
                isDis: false
            })
        }else {
            this.setState({
                isDis: true
            })
        }
    }

    addNewTodo = () => {
        todoList.default = [...todoList.default, this.state.newTodo];
        this.gotoMainPage();
        ToastAndroid.show('New todo added!', ToastAndroid.SHORT);
    }
    gotoMainPage = () => {
        this.setState({
            newTodo: '',
            isDis: true,
        })
        this.props.navigation.navigate('firstStack', {reloadFlag: ''});
    }

    render() {
        return (
            <View style={styles.view}>
                <Text style={{color: '#00539CFF', fontSize: 30}}>Add a New TODO</Text>
                <TextInput value={this.state.newTodo} onChangeText={this.handleNewTodo} style={styles.input} placeholder='TODO text here...' />
                <Button title='Add TODO' onPress={this.addNewTodo} disabled={this.state.isDis} />
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
        paddingHorizontal: 100,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: 'teal',
    }
})
