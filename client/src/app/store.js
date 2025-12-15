import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../feature/auth/auth.Slice";

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})