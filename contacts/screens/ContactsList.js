import React from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CL from '../contactsData'
import {styles} from '../styles'
import {connect} from 'react-redux'

class ContactsList extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Contacts',
        headerTintColor: 'teal',
        headerRight: () => <TouchableOpacity style={{marginRight: 5}} onPress={() => navigation.navigate('secondStack')}><Icon name='add-circle' size={35} color='teal' /></TouchableOpacity>
    })

    renderItem = ({item}) => <View style={{marginVertical: 10, marginLeft: 10}}><Text>{Object.values(item)[0]}</Text><Text>{Object.values(item)[1]}</Text></View>

    render() {
        return (
            <View>
                {Object.keys(this.props.contacts).length && (
                    <FlatList 
                        renderItem={this.renderItem} 
                        data={this.props.contacts} 
                        keyExtractor={item => String(Object.values(item)[1])}
                    />
                ) || <Text style={styles.text}>Nothing to show!</Text>}

                
            </View>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contacts
})


export default connect(mapStateToProps)(ContactsList)