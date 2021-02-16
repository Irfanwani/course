import React from 'react'
import { Text, View, Switch, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {todoList} from './AddTodoScreen'
import { FlatList } from 'react-native-gesture-handler'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            isOn: false
        }
    }

    changeCheck = () => {
        this.setState(prevState => ({isChecked: !prevState.isChecked}))
    }

    changeOn = () => {
        this.setState(prevState => ({isOn: !prevState.isOn}), this.changeCount);
    }

    changeCount = () => {
        if(this.state.isOn) {
            this.props.decreaseCheck();
        }else {
            this.props.increaseCheck();
        }
    }

    changeDelCount = () => {
        if(!this.state.isOn) {
            this.props.decreaseCheck();
        }
    }

    removeTodo = () => {
        if(this.state.isChecked) {
            todoList.default.splice(this.props.id, 1);
            this.changeDelCount();
            this.setState(prevState => ({isChecked: !prevState.isChecked, isOn: false}));
            this.props.update();
            ToastAndroid.show('Todo deleted successfully!', ToastAndroid.SHORT);
        }else {
            ToastAndroid.show('Please check the ckeckbox in the bottom-left corner', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <Switch value={this.state.isOn} onValueChange={this.changeOn} />
                <TouchableOpacity style={styles.btn} >                      
                    <Text style={{color: 'teal', fontSize: 25}}>{String(this.props.todoText).toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <CheckBox value={this.state.isChecked} onValueChange={this.changeCheck} />
                    <TouchableOpacity onPress={this.removeTodo}>
                        <Icon name='delete' size={30} color='brown' />                      
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



export default class MainTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdated: false,
            checkedTodos: 0
        }
    }
    
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: String(navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('name')).toUpperCase(),
            headerTintColor: 'teal',
            headerRight: () => <View style={{marginHorizontal: 10}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
                                        <Icon name='add-circle' size={40} color='teal' />                      
                                    </TouchableOpacity>
                                </View>
        }
    }

    update = () => this.setState(prevState => ({isUpdated: !prevState.isUpdated}))

    decreaseCheck = () => {
        this.setState(prevState => ({checkedTodos: prevState.checkedTodos - 1}))
    }
    increaseCheck = () => {
        this.setState(prevState => ({checkedTodos: prevState.checkedTodos + 1}))
    }

    renderItem = ({item}) => <Todo decreaseCheck={this.decreaseCheck} increaseCheck={this.increaseCheck} update={this.update} todoText={item} id={todoList.default.indexOf(item)} />


    render() {
        if(todoList.default == false) {
            return (
                <View style={{marginHorizontal: 10}}>
                    <Text style={{color: 'grey', fontSize: 20}}>Nothing to Show. In the Top-right corner or down below click on the 'PLUS' icon and add some new todos.</Text>
                    <TouchableOpacity style={{alignItems: 'center', marginTop: 10}} onPress={() => this.props.navigation.navigate('AddTodo')}><Icon name='add-circle' color='teal' size={50} /></TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{backgroundColor: 'skyblue', flex: 1}}>
                <FlatList
                 ListHeaderComponent={() => <View><Text style={styles.text}>Number of Todos: {todoList.default.length}</Text>
                                            <Text style={styles.text}>Number of UnChecked Todos: {this.state.checkedTodos}</Text></View>
                                     }
                 renderItem={this.renderItem}
                 data={todoList.default}
                 keyExtractor={item => String(todoList.default.indexOf(item))}
                 extraData={this.state}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 5
    },

    view: {
        borderWidth: 1, 
        borderColor: 'teal',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 10, 
        paddingHorizontal: 7, 
        paddingVertical: 7,
        backgroundColor: 'white'
    },
    
    text: {
        color: 'purple', 
        fontSize: 16, 
        marginBottom: 5,
        marginLeft: 10
    },
})