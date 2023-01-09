import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Colors } from "react-native/Libraries/NewAppScreen";


export default function Contact() {
    const [user, setUser] = useState({
        isAdd: false
    })

    const handleAddForm = () => {
        setUser({
            isAdd: true
        })
    }
    const handleCancelForm = () => {
        setUser({
            isAdd: false
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.h1}>
                <FontAwesome5 style={styles.icon} name="address-book" />
                <Text style={styles.title}> PhoneBooks</Text>
            </View>
            <View >
                {
                    user.isAdd ? <ContactForm cancel={handleCancelForm} />
                        :
                        <TouchableOpacity style={styles.button} onPress={handleAddForm}>
                            <View style={styles.h1}>
                            <FontAwesome5 style={styles.icon1} name="plus" />
                            <Text style={styles.labelButton}> Add</Text>
                            </View>
                        </TouchableOpacity>
                }
                <ContactSearch />
            </View>
            <View>
                <ContactList />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    h1: {
        display: 'flex',
        flexDirection: 'row',
    },
    form: {
        height: 30,
        borderWidth: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    button: {
        width: 70,
        height: 40,
        padding: 5,
        backgroundColor: '#2d3436',
        borderStyle: 'solid',
        borderColor: '#dfe6e9',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
    },
    labelButton: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color:'#dfe6e9',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    icon: {
        color: 'black',
        fontSize: 50,
        paddingTop: 5
    },
    icon1: {
        color: '#dfe6e9',
        fontSize: 20,
    },
});

