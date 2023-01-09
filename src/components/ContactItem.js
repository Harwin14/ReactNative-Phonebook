import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function ContactItem(props) {
    const [contact, setContact] = useState({
        id: props.contact.id,
        name: props.contact.name,
        phone: props.contact.phone
    })
    const [isEdit, setEdit] = useState({
        editCond: false,
    })
    const editTrue = () => {
        setEdit({
            editCond: true
        })
    }
    const editFalse = () => {
        setEdit({
            editCond: false
        })
    }

    const handleUpdate = useCallback((event) => {
        event.preventDefault()
        props.update(contact.name, contact.phone)
        setContact({ name: contact.name, phone: contact.phone })
        editFalse()
    }, [props, contact])



    if (isEdit.editCond) {
        return (
            <View style={[styles.card, styles.elevation, styles.shadowProp]}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={contact.name}
                        onChangeText={name => setContact({ ...contact, name })}
                        maxLength={30} required />
                </View>

                <View >
                    <TextInput
                        value={contact.phone}
                        onChangeText={phone => setContact({ ...contact, phone })}
                        maxLength={30} required />
                </View>

                <View >
                    <TouchableOpacity onPress={handleUpdate} >
                        <Text>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={editFalse} >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={[styles.card, styles.elevation, styles.shadowProp]}>
                <View style={styles.cardbody}>
                    <View>
                        <Text style={styles.font}>{contact.name}</Text>
                        <Text style={styles.font}>{contact.phone}</Text>
                    </View>

                    <View>
                    </View>

                    <View style={styles.cardfooter}>
                        <TouchableOpacity style={styles.edit} onPress={editTrue}>
                            <FontAwesome5 style={styles.icon}name="edit" />
                        </TouchableOpacity>
                        <TouchableOpacity style={props.sent ? styles.remove : styles.resend} onPress={props.sent ? props.remove : props.resend}>
                            <FontAwesome5 style={styles.icon} name={props.sent ? 'trash' : 'redo'} />
                        </TouchableOpacity>
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
        borderBottomColor:'white',
        borderWidth:1
    },
    cardbody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 10
    },
    cardfooter: {
        display: 'flex',
        flexDirection: 'row',
        fontWeight: 400,
        alignItems: "center",
        paddingVertical: 3
    },
    input: {
        borderWidth: 2,
        borderColor: '#f5f6fa',
        borderRadius: 6,
        borderTopWidth: 0,
        height: 40,
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
        padding: 5

    },
    button: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 5
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
        borderRadius: 50 / 2
    },
    icon:{
        color: 'white',
        fontSize: 20,
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

// import React, { Component } from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faIdBadge, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'
// import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
// export default class ContactItem extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isEdit: false,
//             name: props.contact.name,
//             phone: props.contact.phone
//         }
//     }

//     handleInputChange = (event) => {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;

//         this.setState({
//             [name]: value
//         });
//     }

//     handleUpdate = () => {
//         this.props.update(this.state.name, this.state.phone)
//         this.setState({ isEdit: false })
//     }
//     render() {
//         if (this.state.isEdit) {
//             return (
//                 <View style={styles.container}>
//                     <View>
//                         <View>
//                             <TextInput
//                                 value={this.state.name}
//                                 onPronChangeText={name => setContact({ ...contact, name })} ess={this.handleInputChange}
//                             />
//                         </View>
//                         <View style=''>
//                             <TextInput
//                                 value={this.state.phone}
//                                 onPress={this.handleInputChange}
//                             />
//                         </View>
//                         <View>
//                             <TouchableOpacity
//                                 onPress={this.handleUpdate}>
//                                 <Text> Update</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => this.setState({ isEdit: false })}>
//                                 <Text>Cancel</Text>
//                             </TouchableOpacity>
//                         </View>

//                     </View>

//                 </View>
//             )
//         } else {
//             return (

//                 <View>
//                     <View>
//                         <View>
//                             <View>
//                                 <Text>{this.state.name}</Text>
//                             </View>
//                             <View>
//                                 <Text>{this.state.phone}</Text>
//                             </View>
//                             <View>
//                                 <TouchableOpacity onPress={() => this.setState({ isEdit: true })}>
//                                     <Text> Edit</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={this.props.sent ? this.props.remove : this.props.resend}
//                                     style={[this.props.sent ? 'styles.remove' : 'styles.resend']}>
//                                     <Text style={styles.labelButton}>{this.props.sent ? 'Delete' : 'Resend'}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View> 
//                 </View>
//             )
//         }
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//     },
//     remove: {
//         backgroundColor: '#4cd137',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 40,
//         borderRadius: 10,
//         marginTop:10,
//         marginHorizontal:5
//     },
//     resend: {
//         backgroundColor: '#4cd137',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 40,
//         borderRadius: 10,
//         marginTop:10,
//         marginHorizontal:5
//     },
//     labelButton: {
//         fontWeight: 'bold',
//         textTransform: 'uppercase',
//         textAlign: 'center',
//         color: 'red',
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: 'bold',
//         letterSpacing: 0.25,
//     }
// });