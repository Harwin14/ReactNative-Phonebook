import React, { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { readContactAsync } from "./contactSlice";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch"
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function Contact() {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        isAdd: false,
        isEdit: false
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
    const handleSearch = (value) => {
        setUser({
            isEdit: value
        })
    }
    const handleReset = useCallback(() => {
        dispatch(readContactAsync())
        Keyboard.dismiss()
    }, [dispatch])

    return (

        <View style={styles.container}>
            <View style={styles.h1}>
                <FontAwesome5 style={styles.icon} name="address-book" />
                <Text style={styles.title}> PhoneBooks</Text>
            </View>
            <View >
                {
                    user.isAdd ?
                        <ContactForm cancel={handleCancelForm} />
                        :
                        <View>
                            <View style={styles.row}>
                                <TouchableOpacity style={styles.button} onPress={handleAddForm}>
                                    <View style={styles.h1}>
                                        <Icon style={styles.icon1} name="phone-plus" />
                                        <Text style={styles.labelButton}> Add</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonReset} onPress={handleReset}>
                                    <View>
                                        <FontAwesome5 style={styles.reset} name="retweet" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {
                                !user.isEdit && <ContactSearch />

                            }
                        </View>
                }
            </View>
            <ContactList toggle={handleSearch} />
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
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
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
    buttonReset: {
        width: 70,
        height: 40,
        padding: 5,
        backgroundColor: '#fff200',
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
        color: '#dfe6e9',
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
    reset: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
});

