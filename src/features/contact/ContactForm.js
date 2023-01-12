import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { create } from './contactSlice'
import DropShadow from "react-native-drop-shadow";
import { View, Text, TextInput, StyleSheet, Pressable, Keyboard } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function ContactForm(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: '',
        phone: ''
    });


    const handleSubmit = useCallback(() => {
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
        Keyboard.dismiss()
    }, [dispatch, user])

    return (
        <View style={[styles.card, styles.elevation, styles.shadowProp]}>
            <View style={styles.cardHeader}>
                <Text style={styles.chead}>Add Form</Text>
            </View>
            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Type Contact Name here.."
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Type Phone number here.."
                onChangeText={phone => setUser({ ...user, phone })}
                defaultValue={user.phone}
            />

            <DropShadow style={styles.shadowProp}>
                <Pressable
                    style={styles.button}
                    onPress={handleSubmit}>
                    <View style={styles.row}>
                        <Icon style={styles.iconBtn} name="content-save-check" />
                        <Text style={styles.labelButton}> Save</Text>

                    </View>
                </Pressable>
            </DropShadow>


            <DropShadow style={styles.shadowProp}>
                <Pressable
                    style={styles.cancel}
                    onPress={props.cancel}>
                    <View style={styles.row}>
                        <Icon style={styles.iconBtn} name="close-box-multiple" />
                        <Text style={styles.labelButton}> Cancel</Text>
                    </View>
                </Pressable>
            </DropShadow>

        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#636e72',
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 0,
        width: '100%',
        marginVertical: 10,
    },
    cardHeader: {
        backgroundColor: '#2d3436',
        borderRadius: 5,
        width: '100%',
        height: 40,
        paddingHorizontal: 10
    },
    chead: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignContent: 'center',
        justifyContent: 'center',
        color: '#dfe6e9',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginTop: 10
    },
    input: {
        borderWidth: 2,
        borderColor: '#2d3436',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 6,
        borderTopWidth: 0,
        height: 40
    },
    shadowProp: {
        shadowColor: 'blue',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    elevation: {
        elevation: 20,
        shadowColor: 'blue',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#2d3436',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 5
    },
    cancel: {
        backgroundColor: '#2d3436',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5
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
    iconBtn: {
        color: 'white',
        fontSize: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
});