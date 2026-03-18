import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Admin Login
export const adminLogin = createAsyncThunk(
    "admin-Login",
    async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://10.132.112.108:9090/api/admin/login",
        loginData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login Failed"
      );
    }
  }
);

// AdminLogout
export const AdminLogout = createAsyncThunk(
    "admin/logout",
    async (_, {rejectWithValue})=>{
        try{
            const response = await axios.post(
                "http://10.132.112.108:9090/api/admin/logout",
                {},
                { withCredentials: true }
            );
            return response.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data || "Logout failed"
            );
        }

    }
)

//  FETCH USERS
export const fetchUsers = createAsyncThunk(
  "newUser/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://10.132.112.108:9090/api/auth/users",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch users"
      );
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async({id, userData}, {rejectWithValue})=>{
        try{
            const resposne = await axios.put(
                `http://10.132.112.108:9090/api/auth/users/${id}`,
                userData,
                { withCredentials: true }
            );
            return resposne.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data || "Failed to update users"
            )
        }
    }
)


// delete user
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, {rejectWithValue})=>{
        try {
            await axios.delete(`http://10.132.112.108:9090/api/auth/users/${id}`,
                { withCredentials: true }
            );
            return id;
        }catch(error){
            return rejectWithValue(
                error.response?.data || "Failed to delete users"
            )
        }
        
    }
);

// check admin session
export const checkAdminSession = createAsyncThunk(
    "admin/checkSession",
    async (_, {rejectWithValue})=>{
        try{
            const response = await axios.get("http://10.132.112.108:9090/api/admin/checkSession", {withCredentials:true});
            return response.data;
        }catch(error){
            if (error.response?.status === 401) {
        return rejectWithValue(null);
      }
      return rejectWithValue("Something went wrong");
        }
    }
)

export const AdminSlice = createSlice({
    name:"admin",
    initialState:{
        users:[],
        selectedUser:null,
        editForm: {
            name:"",
            email:"",
            image:"",
            mobile:"",
        },
        deleteUserId:null,
        isDeletePopupOpen:false,
        isViewPopupOpen:false,
        viewUser:null,
        adminData: {
            email:"",
            password:"",
        },
        admin:null,
        loading:false,
        error:null,
        isUserFormOpen:false,
        
    },
    reducers:{
        handleAdminChange:(state,action)=>{
            const {name, value} = action.payload;
            state.adminData[name]=value;
            
        },
        opensUserForm:(state)=>{
            state.isUserFormOpen = true;
        },
        closeUserForm:(state)=>{
            state.isUserFormOpen=false;
            state.selectedUser=null;
            state.editForm={
                name:"",email:"",image:"",mobile:""
            };
        },

        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
            state.editForm = action.payload;
        },
        handleEditChange: (state,action)=>{
            const {name, value} = action.payload;
            state.editForm[name] = value;
        },
        openUserDeletePopup:(state,action)=>{
            state.isDeletePopupOpen=true;
            state.deleteUserId=action.payload;
        },
        closeUserDeletePopup:(state)=>{
            state.isDeletePopupOpen=false;
            state.deleteUserId=null;
        },
        openViewPopup:(state,action)=>{
            state.isViewPopupOpen = true;
            state.viewUser = action.payload;
        },
        closeViewPopup:(state)=>{
            state.isViewPopupOpen = false;
            state.viewUser = null;
        }

    },

    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending, (state)=>{
            // state.loading=true;
            state.error=null;
        })
        .addCase(adminLogin.fulfilled, (state)=>{
            state.loading=false;
            // state.admin=action.payload;
            state.admin=true;

        })
        .addCase(adminLogin.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // FETCH USERS
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Update user
        .addCase(updateUser.fulfilled, (state, action)=>{
            state.users = state.users.map(user =>
                user.id === action.payload.id ? action.payload : user
            );
            state.isUserFormOpen=false;
            state.selectedUser=null;
        })
        // delete user
        .addCase(deleteUser.fulfilled, (state,action)=>{
            state.users = state.users.filter(
                user => user.id !== action.payload
            );
            state.isDeletePopupOpen=false;
            state.deleteUserId=null
        })
        .addCase(checkAdminSession.pending, (state)=>{
            state.loading = true;
        })
        .addCase(checkAdminSession.fulfilled, (state)=>{
            state.loading = false;
            state.admin = true;
        })
        .addCase(checkAdminSession.rejected, (state)=>{
            state.loading = false;
            state.admin = null;
        })
        // LOGOUT
        .addCase(AdminLogout.fulfilled, (state)=>{
            state.admin=null;
            state.adminData = {email:"", password:""};
        })
    }
});

export const {
    // adminLogout, 
    handleAdminChange,
    opensUserForm,
    closeUserForm,
    setSelectedUser,
    handleEditChange,
    openUserDeletePopup,
    closeUserDeletePopup, 
    openViewPopup, 
    closeViewPopup
} = AdminSlice.actions;
export default AdminSlice.reducer;