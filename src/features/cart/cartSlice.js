import { createSlice } from "@reduxjs/toolkit";
import { UPDATE_FREQUENCY_OPTIONS } from "../../common/constants";

const initialState = {
  cartProducts: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.cartProducts[action.payload["code"]] >= 1) {
        state.cartProducts[action.payload["code"]] +=
          action.payload["frequency"];
      } else {
        state.cartProducts[action.payload["code"]] =
          action.payload["frequency"];
      }
    },
    removeItem: (state, action) => {
      delete state.cartProducts[action.payload["code"]];
    },
    updateItemFrequency: (state, action) => {
      const { code, type } = action.payload;
      switch (type) {
        case UPDATE_FREQUENCY_OPTIONS.INCREASE:
          state.cartProducts[code]++;
          break;
        case UPDATE_FREQUENCY_OPTIONS.DECREAASE:
          state.cartProducts[code]--;
          if (state.cartProducts[code] == 0) {
            delete state.cartProducts[code];
          }
          break;

        default:
          break;
      }
    },
  },
});

export const { addItem, removeItem, updateItemFrequency } = cartSlice.actions;
export default cartSlice.reducer;
