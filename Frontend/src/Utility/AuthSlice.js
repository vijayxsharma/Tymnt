import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

// check existing session
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, {rejectWithValue}) =>{
    try{
        const res = await axios.get(
            "http://10.132.112.108:9090/api/auth/me",
        { withCredentials: true }
        );
        return res.data;
    } catch(error){
        return rejectWithValue(
            error.response?.data || "Unauthorized"
        );
    }
    }
);

// login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (loginData, {rejectWithValue})=>{
        try{
            const res = await axios.post(
                "http://10.132.112.108:9090/api/auth/login",
                loginData,
                { withCredentials: true }
            );
            return res.data;
        } catch (err){
            return rejectWithValue(err.response?.data || "Login failed");
        }
    }
);

// logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async ()=>{
        await axios.post(
          "http://10.132.112.108:9090/api/auth/logout",
          {},
          { withCredentials: true }
        );
        return null;
    }
)
const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAuthenticated:false,
        loading:true,
        error:null,
        loginData:{
            email:"",
            password:"",
        }
    },

    reducers:{
        handleChange:((state, action)=>{
           const {name, value} = action.payload;
           state.loginData[name]=value;
        })

    },

    extraReducers:(builder)=>{
        builder
        // CHECK AUTH
        .addCase(checkAuth.pending, (state)=>{
            state.loading=true;
        })
        .addCase(checkAuth.fulfilled, (state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
        })
        .addCase(checkAuth.rejected, (state)=>{
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;
        })

        // LOGIN
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
            state.error=null;
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.error=action.payload;
            state.isAuthenticated=false;
        })
        
        // LOGOUT
        .addCase(logoutUser.fulfilled, (state)=>{
            state.user=null;
            state.isAuthenticated=false;
        });
        
    },
});

export const {handleChange} = AuthSlice.actions;
export default AuthSlice.reducer;