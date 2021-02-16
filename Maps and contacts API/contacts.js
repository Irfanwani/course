import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Contacts from 'expo-contacts'

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomContact: null
        }
    }

    getRandomContact = async () => {
        let {status} = await Permissions.askAsync(Permissions.CONTACTS);
        if(status !== 'granted') {
            console.error('Permission not granted')
            return;
        }
        let contacts = await Contacts.getContactsAsync({
            pageSize: 1,
            pageOffset: 0,
            fields: [Contacts.PHONE_NUMBERS]
        });

        let {total} = contacts;
        let n = Math.floor(Math.random() * 10);

        let randomContact = await Contacts.getContactsAsync({
            pageSize: 10,
            pageOffset: n,
            fields:[Contacts.PHONE_NUMBERS]
        })

        let {data} = randomContact;
        let c = data[n];

        this.setState({
            randomContact: c,
        })
        console.log('random contact details goes here\n',n, c);
    } 

    render() {
        return (
            <View style={styles.view}>
                <Button title='Get random contact' onPress={() => this.getRandomContact()} />
                {this.state.randomContact && (
                    <Text style={{fontSize: 20, color: 'teal'}}>Random contact: {this.state.randomContact.name}</Text>
                ) || null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})