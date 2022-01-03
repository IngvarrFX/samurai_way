import React, {useCallback} from "react"
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form"
import {Dispatch} from "redux";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLength, required} from "../utils/validators/validators";


type LoginFormType = {
    newPostBody: string
}
const maxLength15 = maxLength(20)
const AddPostForm: React.FC<InjectedFormProps<LoginFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="add new post" component={Textarea} name="newPostBody" type="text"
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}


const ContactForm = reduxForm<LoginFormType>({
    form: "form"
})(AddPostForm)


type ProfileType = {
    addPostFormHandler: (value: string) => void
}

export const AddPost = (props: ProfileType) => {
    const onSubmit = useCallback((formData: LoginFormType, dispatch: Dispatch) => {
        props.addPostFormHandler(formData.newPostBody)
        dispatch(reset("form"))
    }, [props.addPostFormHandler])
    return (
        <div>
            <ContactForm onSubmit={onSubmit}/>
        </div>
    )
}
