import { createSlice } from '@reduxjs/toolkit';
import { User } from './interfaces/User.interface';

const initialState:User = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null, 
}

export const authSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        login: (state, {payload} ) => {
            
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            
        },
        logout:( state , {payload}) => {

            state.status = 'not-authenticated'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoURL = null
            state.errorMessage = payload 
        },
        checkingCredentials: ( state ) => {
            state.status = 'checking'
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;