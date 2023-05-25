import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Comment {
  author: string
  text: string
}

interface CommentsState {
  [country: string]: Comment[]
}

const commentsSlice = createSlice({
  name: "comments",
  initialState: {} as CommentsState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ country: string; comment: Comment }>,
    ) => {
      const { country, comment } = action.payload
      if (!state[country]) {
        state[country] = []
      }
      state[country].push(comment)
    },
  },
})

const store = configureStore({
  reducer: commentsSlice.reducer,
})

export const { addComment } = commentsSlice.actions
export default store

export type RootState = ReturnType<typeof store.getState>
