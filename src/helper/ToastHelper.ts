import { Dispatch, AnyAction } from "@reduxjs/toolkit";

export function ShowToast(dispatch: Dispatch<AnyAction>, messgae: string, type: string) {
    console.log('dispaticng start')

    console.log(dispatch, 'dispatch')
    dispatch({
        type: "showToast",
        payload: {
            showtoast: true,
            message: messgae,
            type: type
        }
    });
    console.log('dispaticng done')
}
export function HideToast(dispatch: Dispatch<AnyAction>) {
    dispatch({
        type: "hideToast",
        payload: {
            showtoast: false,
            message: "",
            type: ''
        }
    });
}
