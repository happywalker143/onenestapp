"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import Counter from "./Counter";
// import Header from "./Header";

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );

}


