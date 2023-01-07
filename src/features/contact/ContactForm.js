import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { create } from './contactSlice'


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBan, faCircleCheck, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Card } from "@paraboly/react-native-card";


export default function ContactForm() {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        phone: ''
    });

    const handleSubmit = useCallback(() => {
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    return (
        <View style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignContent: 'flex-start',
            alignItems: 'center',
        }}>
            <Card
                iconDisable
                title="Title"
                description="Main Content"
                bottomRightText="30"
                onPress={() => { }}
            />;
            <TextInput
                style={{ height: 40 }}
                placeholder="Enter Contact Name here.."
                onChangeText={name => setUser(...user, name)}
                defaultValue={user.name}
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="Enter Phone number here.."
                onChangeText={phone => setUser(...user, phone)}
                defaultValue={user.phone}
            />
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.labelButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    submit: {
        width: '100%',
        padding: 5,
        backgroundColor: 'blue',
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5
    },
    labelButton: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff'
    },

});