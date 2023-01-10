import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropShadow from "react-native-drop-shadow";


export default function ContactItem(props) {
    const [contact, setContact] = useState({
        id: props.contact.id,
        name: props.contact.name,
        phone: props.contact.phone
    })
    const [Edit, setEdit] = useState({
        isEdit: false,
    })
    const handleEditForm = () => {
        setEdit({
            isEdit: true
        })
        props.toggle(true)
    }
    const handleCancelForm = () => {
        setEdit({
            isEdit: false
        })
        props.toggle(false)

    }

    const handleUpdate = useCallback(() => {
        props.update(contact.name, contact.phone)
        setContact({ name: contact.name, phone: contact.phone })
        handleCancelForm()
    }, [props, contact])


    if (Edit.isEdit) {
        return (
            <View style={[styles.cardInput, styles.elevation, styles.shadowProp]}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={contact.name}
                        onChangeText={name => setContact({ ...contact, name })}
                        maxLength={30} required />
                </View>

                <View >
                    <TextInput
                        style={styles.input}
                        value={contact.phone}
                        onChangeText={phone => setContact({ ...contact, phone })}
                        maxLength={30} required />
                </View>

                <View  >

                    <DropShadow style={styles.shadowProp}>
                        <Pressable
                            style={styles.button}
                            onPress={handleUpdate}>
                            <Text style={styles.fontInputButton}>Update</Text>
                        </Pressable>
                    </DropShadow>
                    <DropShadow style={styles.shadowProp}>
                        <Pressable
                            style={styles.button}
                            onPress={handleUpdate}>
                            <Text style={styles.fontInputButton}>Cancel</Text>
                        </Pressable>
                    </DropShadow>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <View style={[styles.card, styles.elevation, styles.shadowProp]}>
                    <View style={styles.cardbody}>
                        <TouchableOpacity style={styles.border} onPress={handleEditForm}>
                            <FontAwesome5 style={styles.iconUser} name="user" />
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.font}>{contact.name}</Text>
                            <Text style={styles.font}>{contact.phone}</Text>
                        </View>

                        <View>
                        </View>
                            {
                                props.sent ?
                                    <View style={styles.cardfooter}>
                                        <TouchableOpacity style={styles.edit} onPress={handleEditForm}>
                                            <FontAwesome5 style={styles.icon} name="edit" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.remove} onPress={props.remove}>
                                            <FontAwesome5 style={styles.icon} name={'trash'} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                    <TouchableOpacity style={styles.resend} onPress={ props.resend}>
                                        <FontAwesome5 style={styles.icon} name={'redo'} />
                                    </TouchableOpacity>
                                    </View>
                            }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#2d3436',
        borderRadius: 10,
        width: '100%',
        marginVertical: 0,
        borderBottomColor: 'white',
        borderWidth: 1
    },
    cardInput: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#636e72',
        borderRadius: 10,
        paddingBottom: 5,
        paddingHorizontal: 0,
        width: '100%',
        marginVertical: 10,
    },
    input: {
        borderWidth: 2,
        borderColor: '#2d3436',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 6,
        borderTopWidth: 0,
        height: 40,
        textAlign: 'center',
    },
    cardbody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 4
    },
    cardfooter: {
        display: 'flex',
        flexDirection: 'row',
        fontWeight: 400,
        alignItems: "center",
        paddingVertical: 3
    },
    cardfooterInput: {
        display: 'flex',
        fontWeight: 400,
        alignItems: "center",
        paddingVertical: 3,
        justifyContent: 'space-evenly'
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 100,
        shadowColor: 'black',
    },

    button: {
        backgroundColor: '#2d3436',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 1,
        marginHorizontal: 5
    },
    shadowProp: {
        shadowColor: 'blue',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 20,
        shadowColor: 'black',
    },
    font: {
        fontWeight: 'bold',
        color: '#dfe6e9',
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        textAlign: 'left',
        paddingTop: 10,
        width: 180

    },
    fontInputButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        textAlign: 'left',
        padding: 5,

    },

    edit: {
        backgroundColor: '#009432',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        position: 'relative'
    },
    update: {
        backgroundColor: '#2d3436',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%',
        borderRadius: 10,
        marginVertical: 2,
        paddingHorizontal: 5
    },
    icon: {
        color: 'white',
        fontSize: 20,
    },
    iconUser: {
        color: 'black',
        fontSize: 42,
        textAlign: 'center',
    },
    border: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 1,
        height: 60,
        width: 60,
        borderRadius: 60 / 2

    },
    remove: {
        backgroundColor: '#EA2027',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        color: 'white',
        fontSize: 20,
        height: 50,
        width: 50,
        borderRadius: 50 / 2
    },
    resend: {
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        color: 'white',
        fontSize: 20,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginRight: 70    

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
