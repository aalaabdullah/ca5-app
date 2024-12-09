
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
      const msg = response.data.msg
      console.log(msg)
      return { msg }
    }
    catch (error) {
      const msg = error.msg;
      return({msg})
     }
  })



export const login = createAsyncThunk(
  "users/login",
  async(userData)=>{
    try{
      const response= await axios.post(`${process.env.REACT_APP_API_URL}/login`,{
        email: userData.email,
        password: userData.password,
      })
      //console.log(responce)
      const user = response.data.user;
      const msg =  response.data.msg;
      return({user,msg}); //من index.js انا راسله لما يدخل صح يرسل المعلومات و المسج
    }
    catch(error){
      const msg = error.msg;
      return({msg})
    }
  }
)








export const registerUser = createAsyncThunk(
  "users/registerUser",
  async(userData)=>{
    try{
      const response= await axios.post(`${process.env.REACT_APP_API_URL}/registerUser`,{
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
      //console.log(responce)
      const user = response.data.user;
      const msg =  response.data.msg;
      return{user,msg};
    }
    catch(error){
      console.log("error")
    }
  }
)
const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: null,
  isLogin:false
}


export const userSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user=action.payload.user;
        state.msg=action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true; 
        state.msg=action.payload.msg;
      })


//login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user=action.payload.user;
        state.msg=action.payload.msg;
        state.isLogin=true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true; 
        state.msg=action.payload.msg;
      })

//logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;          
      })
      .addCase(logout.rejected, (state) => {
         state.isError = true
      });

  },

});

//export const { } = userSlice.actions; //export the function

export default userSlice.reducer;
