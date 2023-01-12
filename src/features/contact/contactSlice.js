import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { readContact, createContact, deleteContact, updateContact } from './contactAPI';
import axios from 'axios';
const request = axios.create({
    baseURL: 'http://192.168.1.66:3001/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
});

const initialState = {
    value: {
        data: [],
        params: {
            page: 1,
            totalPages: 0
        }
    },
    status: 'idle'
}

export const readContactAsync = createAsyncThunk(
    'contact/readContact',
    async () => {
        try {
            const { data } = await readContact();
            return { contact: data.data.contact, page: data.data.page, totalPages: data.data.totalPages };
        } catch (err) {
            console.log(err);
        }
    }
)

export const createContactAsync = createAsyncThunk(
    'contact/createContact',
    async ({ id, name, phone }) => {
        try {
            const { data } = await createContact(name, phone);
            return { success: true, id, contact: data.data }
        } catch (err) {
            return { success: false, id }
        }
    }
)
// export const deleteContactAsync = createAsyncThunk(
//     'contact/deleteContact',
//     async (id) => {
//         try {
//             await deleteContact(id);
//             return { id }
//         } catch (err) {
//             console.log(err);
//         }
//     }
// )
export const deleteContactAsync = createAsyncThunk(
    'contact/deleteContact',
    async (id) => {
        const { data } = await deleteContact(id);
        return { id, contact: data.data }
    }
)
export const updateContactAsync = createAsyncThunk(
    'contact/updateContact',
    async ({ id, name, phone }) => {
        try {
            const { data } = await updateContact(id, name, phone);
            return { id, contact: data.data }
        } catch (err) {
            console.log(err)
        }
    }
)



export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value.data.unshift({
                id: action.payload.id,
                name: action.payload.name,
                phone: action.payload.phone,
                sent: true
            })
            // state.value = {
            //     ...state.value,
            //     data: [
            //         ...state.value.data,
            //         {
            //             id: action.payload.id,
            //             name: action.payload.name,
            //             phone: action.payload.phone,
            //             sent: true
            //         }
            //     ]
            // }
        },
        searchContact: (state, action) => {
            state.value = {
                data: action.payload.contact.map(item => {
                    item.sent = true
                    return item
                }),
                params: action.payload.params
            }

        },
        loadMore: (state, action) => {
            state.value = {
                data: [...state.value.data, ...action.payload.contact.map(item => {
                    item.sent = true
                    return item
                })],
                params: action.payload.params
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(readContactAsync.pending, (state) => {
                state.status = 'loading'
            })
            // .addCase(readContactAsync.fulfilled, (state, action) => {
            //     state.status = 'idle'
            //     state.value = action.payload.contact.map(item => ({
            //         id: item.id,
            //         name: item.name,
            //         phone: item.phone,
            //         sent: true
            //     }))
            // })
            .addCase(readContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = {
                    data: action.payload.contact.map(item => {
                        item.sent = true
                        return item
                    }),
                    params: {
                        page: action.payload.page,
                        totalPages: action.payload.totalPages
                    }
                }
            })
            .addCase(createContactAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.success) {
                    state.value = {
                        ...state.value,
                        data: [...state.value.data.map(item => {
                            if (item.id === action.payload.id) {
                                return {
                                    id: action.payload.contact.id,
                                    name: action.payload.contact.name,
                                    phone: action.payload.contact.phone,
                                    sent: true
                                }
                            }
                            return item
                        })]
                    }
                } else {
                    state.value = {
                        ...state.value,
                        data: [...state.value.data.map(item => {
                            if (item.id === action.payload.id) {
                                return {
                                    ...item,
                                    sent: false
                                }
                            }
                            return item
                        })]
                    }
                }
            })
            .addCase(deleteContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = {
                    ...state.value,
                    data: [...state.value.data.filter(item => item.id !== action.payload.id)]
                }
            })
            .addCase(updateContactAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = {
                    ...state.value,
                    data: [...state.value.data.map(item => {
                        if (item.id === action.payload.id) {
                            return {
                                id: action.payload.contact.id,
                                name: action.payload.contact.name,
                                phone: action.payload.contact.phone,
                                sent: true
                            }
                        }
                        return item
                    })]
                }
            })
    },
})
export const { add, searchContact, loadMore } = contactSlice.actions

export const selectContact = (state) => state.contact.value.data

export const create = (name, phone) => (dispatch, getState) => {
    const id = Date.now()
        dispatch(add({ id, name, phone }))
        dispatch(createContactAsync({ id, name, phone }))
};

export const search = (query) => (dispatch, getState) => {
    let state = getState()
    let params = {
        ...state.contact.value.params,
        ...query,
        page: 1
    }
    request.get('users', { params }).then(({ data }) => {
        params = {
            ...params,
            totalPages: data.data.totalPages
        }
        dispatch(searchContact({ contact: data.data.contact, params }))
    })
};

export const pagination = () => {
    return async (dispatch, getState) => {
        try {
            let state = getState()
            if (state.contact.value.params.page < state.contact.value.params.totalPages) {
                let params = {
                    ...state.contact.value.params,
                    page: state.contact.value.params.page + 1
                }
                const { data } = await request.get('users', { params })
                params = {
                    ...params,
                    totalPages: data.data.totalPages
                }
                dispatch(loadMore({ contact: data.data.contact, params }))
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export default contactSlice.reducer;
