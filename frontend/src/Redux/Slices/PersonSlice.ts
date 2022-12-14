import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Person, Address, Role, Theme } from "../../Types/Person";

export interface  resetDetails {
    email: string,
    old: string,
    new: string
         }

export interface AuthState{
    isLoggedIn:boolean,
    isRegistered:boolean,
    registeredError: boolean,
    loginError: boolean,
    currentUser: Person,
    resetError: boolean,
    isReset:boolean
}
export interface User {
    name?:string,
    email:string;
    password:string;
};
const  personRole:Role = {
    roleId: 0,
    role: ""
}

const personTheme:Theme= {
    themeId: 0,
    theme: ""
}

const person:Person={
    customerId: 0,
    name:"",
    email: "",
    password: "",
    phone: "",
    image: "",
    theme: personTheme,
    role: personRole,
    orders:[]
};
const initialState:AuthState =  {
    isLoggedIn: false, registeredError: false, loginError: false, currentUser: person,
    isRegistered: false,
    resetError: false,
    isReset: false
};

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async(reset:resetDetails, thunkAPI) => {
        try{    
            const res = await axios.post("http://localhost:8500/persons/forgotPassword",reset);
           return {user: res.data};
        } catch(e) {
            return thunkAPI.rejectWithValue('Incorrect email');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'admin/updateProduct',
    async(person:Person, thunkAPI) => {
        try{
            
            const res = await axios.put("http://localhost:8500/persons/update", person);
            console.log(res.data);
            return {user:res.data};
        } catch(e) {
            return thunkAPI.rejectWithValue('Profile could not be updated');
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async(user:User, thunkAPI) => {
        try{
            
            const res = await axios.post("http://localhost:8500/persons/register", user);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);
export const login = createAsyncThunk(
    'user/login',
    async(user:User, thunkAPI) => {
        try{    
            const res = await axios.post("http://localhost:8500/persons/login", user);
            console.log("login slice res data "+res.data);
           return {user: res.data};
         
        } catch(e) {
            return thunkAPI.rejectWithValue('Incorrect username or password');
        }
    }
);
export const updateAddress = createAsyncThunk(
    'orders/updateAddress',
    async(PAddress:Address, thunkAPI) => {
        try{console.log("in slice PAddress: " + PAddress.city);
            const res = await axios.post("http://localhost:8500/persons/update/address", PAddress);
            console.log(res.data);
            return{user: res.data};
        } catch(e) {
            return null;
        }
    }
);
export const UserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            //const rootState = useSelector((state:RootState) => state);

            state.loginError = false;
            state.isLoggedIn=false;
            state.loginError=false;
            state.currentUser=person;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loginError=false;
            state.currentUser= action.payload.user;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            console.log("useruseruser "+JSON.stringify(localStorage.getItem('user')));
            return state;
        });
        builder.addCase(register.fulfilled, (state,action) => {
            state.isRegistered=true;
            state.registeredError=false;
            state.currentUser=action.payload.user;
            return state
        });
        builder.addCase(register.rejected, (state,action) => {
            console.log("inside login rejected")
            state.registeredError=true;
            state.isRegistered=false;
           
            return state
        });
        builder.addCase(login.rejected, (state) => {
            state.loginError = true;
            state.isLoggedIn=false;
            state.currentUser=person;
            return state
        });
        builder.addCase(updateAddress.fulfilled, (state, action) => {
            return state;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action)=>{
            state.currentUser=action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            state.resetError =false;
            state.isReset=true;
            return state
        });
        builder.addCase(forgotPassword.rejected, (state, action)=>{
            //state.currentUser=action.payload.user;
            //localStorage.setItem("user", JSON.stringify(action.payload.user));
            state.isReset=false
            state.resetError =true;
            return state
        });
     
            builder.addCase(updateProfile.fulfilled, (state, action) => {      
                //  initialState.currentProduct = action.payload.product;
                  localStorage.setItem("user", JSON.stringify(action.payload.user));
                  return state;
            });
    }
});
export const {logout}= UserSlice.actions;
export default UserSlice.reducer;