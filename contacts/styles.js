import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'teal',
        borderRadius: 20,
        paddingHorizontal: 80,
        paddingVertical: 5,
        marginVertical: 3
    },
    error: {
        color: 'red'
    },
    text: {
        textAlign: 'center',
        marginTop: 20, 
        fontSize: 20, 
        color: 'grey'
    }
})
