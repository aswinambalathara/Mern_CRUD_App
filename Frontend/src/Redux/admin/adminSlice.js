import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAdmin:null
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        signAdminInSuccess:(state,action) =>{
            state.currentAdmin = action.payload
        },
        adminSignOut:(state)=>{
            state.currentAdmin = null;
        }
    }
});

export const {signAdminInSuccess,adminSignOut} = adminSlice.actions;
export default adminSlice.reducer;