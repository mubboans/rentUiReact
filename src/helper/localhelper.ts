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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChangeUserState(dispatch: Dispatch<AnyAction>, type: string, state: any) {
    dispatch({
        type: type,
        payload: state
    })
}
export function ChangeUserSession(dispatch: Dispatch<AnyAction>, state: boolean) {
    console.log('state', state);
    dispatch({
        type: "userSession",
        payload: state
    })
}
export function LogoutUser(dispatch: Dispatch<AnyAction>) {
    console.log('logouting users');
    localStorage.removeItem('token');
    localStorage.removeItem('userdetail');
    localStorage.clear();
    ChangeUserState(dispatch, "userState", false)
}