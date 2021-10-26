import React from "react"
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form"
import {Dispatch} from "redux";
import {maxLength, required } from "../utils/validators/validators";
import {Textarea} from "../common/FormControls/FormControls";


type LoginFormType = {
    newMessageBody: string
}
const maxLength15 = maxLength(15)

const DialogForm: React.FC<InjectedFormProps<LoginFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Enter your new message" component={Textarea} name="newMessageBody" type="text" validate={[ required, maxLength15 ]}/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}


const ContactForm = reduxForm<LoginFormType>({
    form: "form"
})(DialogForm)


type DialogType = {
    addNewMessageBody: (value: string) => void
}

export const Dialog = (props: DialogType) => {
    const onSubmit = (formData: LoginFormType, dispatch: Dispatch) => {
        props.addNewMessageBody(formData.newMessageBody)
        dispatch(reset("form"));
    }
    return (
        <div>
            <ContactForm onSubmit={onSubmit}/>
        </div>
    )
}