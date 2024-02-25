const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    userDetails: {},
    token: '',
    isLoggedIn: false
};
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginUser: (state, actions)=>{
            return{
                ...state,
                token:actions.payload.token,
                userDetails:actions.payload.userDetails,
                isLoggedIn:true
            }
        },

        logoutUser:(state, actions)=>{
                return {...initialState}
        }
    }
})

export const {loginUser, logoutUser}= userSlice.actions
export default userSlice.reducer;