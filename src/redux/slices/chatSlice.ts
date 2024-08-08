import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IMessage, IChatState } from "../../types";

const fetchAiMessage = createAsyncThunk<IMessage, IMessage[]>(
  "chat/fetchAiMessage",
  async (chatHistory: IMessage[]) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState: IChatState = {
  status: "idle",
  chatHistory: [],
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.chatHistory.push(action.payload);
    },
    clearChat: (state) => {
      state.chatHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiMessage.fulfilled, (state, action: PayloadAction<IMessage>) => {
        if (action.payload) {
          state.chatHistory.push(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(fetchAiMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchAiMessage.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
export { fetchAiMessage };
export const selectChatHistory = (state: RootState) => state.chat.chatHistory;
