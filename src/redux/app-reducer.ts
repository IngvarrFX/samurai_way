import {getUserDataThunk} from "./authReducer";
import {AppThunk} from "./reduxStore";

type InitialStateType = {
    initialized: boolean
}

const initialState = {
    initialized: false
}


export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCSESS":
            return {...state, initialized: true}
        default:
            return state
    }
}

const initializedSuccsess = () => ({type: "INITIALIZED_SUCCSESS"})


export const initializeApp = (): AppThunk => async (dispatch) => {
    const res = await dispatch(getUserDataThunk())
    try {
        dispatch(initializedSuccsess())
    } catch (error) {
        console.log(error)
    }


}

type ActionsType = ReturnType<typeof initializedSuccsess>