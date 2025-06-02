import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null);

const user = new UserStore();
const device = new DeviceStore();

ReactDOM.render(
    <Context.Provider value={{ user, device }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

