import { createSlice } from "@reduxjs/toolkit";

const ConfigSlice = createSlice({
  name: "config",
  initialState: {
    selection:'hello'
  },
  reducers: {
     updateSelection(state , action){
        state.selection = action.payload ;
     }
  },
});

export default ConfigSlice;
export const { updateSelection } = ConfigSlice.actions;
