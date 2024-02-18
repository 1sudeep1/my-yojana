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
            console.log(actions)
            return{
                ...state,
                token:actions.payload.token,
                userDetails:actions.payload.userDetails,
                isLoggedIn:true
            }
        }
    }
})

export const {loginUser}= userSlice.actions
export default userSlice.reducer;