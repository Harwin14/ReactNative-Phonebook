import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { search } from './contactSlice';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import DropShadow from "react-native-drop-shadow";


export default function ContactForm(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        isAdd: false,
        name: '',
        phone: ''
    })


    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(search({ name: user.name, phone: user.phone }))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])



    return (
        <View>
            <View style={[styles.card, styles.elevation, styles.shadowProp]}>
                <View style={styles.cardHeader}>
                <Text style={styles.chead}>Search Form</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Contact Name here.."
                    onChangeText={name => setUser({...user, name})}
                    defaultValue={user.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Phone number here.."
                    onChangeText={phone => setUser({...user, phone})}
                    defaultValue={user.phone}
                />
                <DropShadow style={styles.shadowProp}>
                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit}>
                        <Text style={styles.labelButton}>Search</Text>
                    </Pressable>
                </DropShadow>

            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 0,
        width: '100%',
        marginVertical: 10,
    },
    cardHeader: {
        backgroundColor: '#f5f6fa',
        borderRadius: 5,
        width: '100%',
        height:40,
        paddingHorizontal:10
    },
    chead:{
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignContent:'center',
        justifyContent:'center',
        color: 'black',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginTop:10
    },
    input:{
      borderWidth:2,
      borderColor:'#f5f6fa',
      borderRadius:6,
      borderTopWidth:0,
      height: 40
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 20,
        shadowColor: 'black',
    },
   
    submit: {
        width: '100%',
        padding: 5,
        backgroundColor: 'blue',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical:10,
        marginHorizontal:5
    },
    labelButton: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

});