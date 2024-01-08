import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export const getValue = (name: string) => {
    const value = localStorage.getItem(name);
    const storedValue = value ? value : "{}";
    return JSON.parse(storedValue);
}

export const setValue = (name: string, value: object) => {
    const data = JSON.stringify(value);
    localStorage.setItem(name, data);
}

export const isUserLogined = () => {
    return !!localStorage.getItem('token');
}
export function ChangeUserState(dispatch: Dispatch<AnyAction>, state: boolean) {
    dispatch({
        type: "userState",
        payload: state
    })
}

export function LogoutUser(dispatch: Dispatch<AnyAction>) {
    console.log('logouting users');
    localStorage.removeItem('token');
    localStorage.removeItem('userdetail');
    localStorage.clear();
    ChangeUserState(dispatch, false)
}