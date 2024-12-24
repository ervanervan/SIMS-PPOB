// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { registerUser as apiRegisterUser } from "../services/authService";

// interface User {
//   email: string;
//   first_name: string;
//   last_name: string;
// }

// interface AuthState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
//   success: false,
// };

// // Thunk untuk Register
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (
//     {
//       email,
//       firstName,
//       lastName,
//       password,
//     }: {
//       email: string;
//       firstName: string;
//       lastName: string;
//       password: string;
//     },
//     thunkAPI
//   ) => {
//     try {
//       const data = await apiRegisterUser({
//         email,
//         firstName,
//         lastName,
//         password,
//       });
//       return {
//         email: data.email,
//         first_name: data.first_name,
//         last_name: data.last_name,
//       }; // Memastikan payload sesuai dengan struktur AuthState
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     resetState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.user = action.payload; // Payload langsung digunakan untuk state.user
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetState } = authSlice.actions;

// export default authSlice.reducer;
