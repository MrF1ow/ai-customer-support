import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IMessage, IChatState } from "../../types";
import { clear } from "console";

const initialState: IChatState = {
  aiMessages: [],
  userMessages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addAiMessage: (state, action: PayloadAction<IMessage>) => {
      state.aiMessages.push(action.payload);
    },
    addUserMessage: (state, action: PayloadAction<IMessage>) => {
      state.userMessages.push(action.payload);
    },
    clearChat: (state) => {
      state.aiMessages = [];
      state.userMessages = [];
    },
  },
});

export const { addAiMessage, addUserMessage, clearChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

export const selectAiMessages = (state: RootState) => state.chat.aiMessages;
export const selectUserMessages = (state: RootState) => state.chat.userMessages;
