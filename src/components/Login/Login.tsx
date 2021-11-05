import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Input} from "../../common/FormControls/FormControls";
import {maxLength, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Redirect} from "react-router-dom";


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
                <Field placeholder="Login" component={Input} name="login" type="text"
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field placeholder="Password" component={Input} name="password" type="password"
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <Field component="input" name="rememberMe" type="checkbox"/> Remember me
            </div>
            { props.error &&
                <div>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const ContactForm = reduxForm<LoginFormType>({
    form: "form"
})(LoginForm)


type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}


const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: LoginFormType) => {
        //loginAPI.login(formData.login, formData.password, formData.rememberMe)
        props.login(formData.login, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <ContactForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}


// export default compose<ComponentType>(connect(null, {
//     login: loginTC
// }),withAuthRedirect)(Login)
export default connect(mapStateToProps, {login: loginTC})(Login)