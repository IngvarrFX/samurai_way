import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {loginAPI} from "../../api/api";
import {Input} from "../../common/FormControls/FormControls";
import {maxLength, required} from "../../utils/validators/validators";


type LoginFormType = {
    login: string
    password: string
    rememberMe: boolean
}
const maxLength15 = maxLength(30)


const LoginForm: React.FC<InjectedFormProps<LoginFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Login" component={Input} name="login" type="text" validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field placeholder="Password" component={Input} name="password" type="text" validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field component="input" name="rememberMe" type="checkbox"/> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const ContactForm = reduxForm<LoginFormType>({
    form: "form"
})(LoginForm)


export const Login = () => {
    const onSubmit = (formData: LoginFormType) => {
        loginAPI.login(formData.login, formData.password, formData.rememberMe)
    }
    return (
        <div>
            <h1>Login</h1>
            <ContactForm onSubmit={onSubmit}/>
        </div>
    )
}