import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    "newUser/registerUser",
    async(userData, {rejectWithValue})=>{
        try{
            const response = await axios.post("http://10.132.112.108:9090/api/auth/register",
                {
                    name:userData.name,
                    email:userData.email,
                    image:userData.image,
                    mobile:userData.mobile,
                    password:userData.password,
                }
            );
            return response.data;
        } catch(error){
            return rejectWithValue(
                error.response?.data || "Registration failed"
            );
        }
    }
)
const validatePassword = (password, confirmPassword) => {
  return {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    specialchar: /[!@#$&*?]/.test(password),
    minlength: password.length >= 8,
    passwormatch:
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword,
  };
};



const initialState={
        loading:false,
        error:null,
        success:false,
        inputFields:{
            name: "",
            email: "",
            image:"",
            mobile: "",
            password: "",
            confirmPassword: "",
        },
        validateInput:{
            uppercase: false,
            lowercase: false,
            digit: false,
            specialchar: false,
            minlength: false,
            passwormatch: false,
        }
    };
export const NewUserSlice = createSlice({
    name:"newUser",
    initialState,
    reducers:{
        handleUserChange:(state,action)=>{
            const {name, value} = action.payload;
            state.inputFields[name]=value;
            if(name==="password" || name==="confirmPassword"){
                const {password,confirmPassword} = state.inputFields;
                state.validateInput=validatePassword(password,confirmPassword)
            }
        },

        resetForm:(state)=>{
            state.inputFields=initialState.inputFields;
            state.validateInput=initialState.validateInput;
            state.success=false;
            state.error=null;
        }

        

    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;
        })
        .addCase(registerUser.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.inputFields=initialState.inputFields;
            state.validateInput=initialState.validateInput;
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.success=false;
        })

    }

});

export const {handleUserChange} = NewUserSlice.actions;
export default NewUserSlice.reducer;