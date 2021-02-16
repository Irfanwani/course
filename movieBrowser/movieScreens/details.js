import React from 'react'
import {ActivityIndicator, View, ScrollView, Text, Image, Dimensions, StyleSheet } from 'react-native'

export default class MoreDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: ''
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.getParam('title')
    })

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch(`http://www.omdbapi.com/?i=${this.props.navigation.getParam('i')}&apikey=3bc90adf`)
        const result = await response.json()
        this.setState({details: result})
        this.props.navigation.setParams({title: this.state.details.Title})

    } 

    render() {
        if(this.state.details) {
            return (
                <ScrollView>
                    <Image resizeMode='contain' style={{height: Dimensions.get('window').height/2, width: Dimensions.get('window').width}} source={{uri: this.state.details.Poster}} />                
                    <Text style={styles.text}>Title: {this.state.details.Title}</Text>
                    <Text style={styles.text}>Language: {this.state.details.Language}</Text>
                    <Text style={styles.text}>Ratings: {this.state.details.Ratings[0]?.Value}</Text>
                    <Text style={styles.text}>Year: {this.state.details.Year}</Text>
                    <Text style={styles.text}>Released On: {this.state.details.Released}</Text>
                    <Text style={styles.text}>Rated: {this.state.details.Rated}</Text>
                    <Text style={styles.text}>Genre: {this.state.details.Genre}</Text>
                    <Text style={styles.text}>Director: {this.state.details.Director}</Text>
                    <Text style={styles.text}>Writer: {this.state.details.Writer}</Text>
                    <Text style={styles.text}>Actors: {this.state.details.Actors}</Text>
                    <Text style={styles.text}>Country: {this.state.details.Country}</Text>
                    <Text style={styles.text}>Awards: {this.state.details.Awards}</Text>
                </ScrollView>
            )
        }
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size='large' color='black' /></View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        marginHorizontal: 10,
        fontWeight: 'normal',
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'teal',
        textAlign: 'center',
        paddingHorizontal: 5,
        borderRadius: 20
    }
})