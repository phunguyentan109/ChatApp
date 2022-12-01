import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: { messages: [], users: [] },
  reducers: {
    receiveMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
    updateUsers: (state, action) => {
      state.users = [...action.payload]
    },
  },
})

export const { receiveMessage, updateUsers } = chatSlice.actions

export default chatSlice.reducer
