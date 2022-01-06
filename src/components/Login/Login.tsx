import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Input} from "../../common/FormControls/FormControls";
import {maxLength, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reduxStore";
import {Redirect} from "react-router-dom";

type LoginFormPropsType = {
    captchaUrl: string | null
}
type LoginFormType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}
const maxLength15 = maxLength(30)


const LoginForm: React.FC<InjectedFormProps<LoginFormType, LoginFormPropsType> & LoginFormPropsType> = (props) => {
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
            {props.error &&
            <div>
                {props.error}
            </div>}
            {props.captchaUrl &&
            <img src={props.captchaUrl} alt="captcha"/>}
            {props.captchaUrl &&
            <Field placeholder="Symbol anti-bot" component={Input} name="captcha" type="text"
                   validate={[required, maxLength15]}/>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const ContactForm = reduxForm<LoginFormType, LoginFormPropsType>({
    form: "form"
})(LoginForm)


type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: string | null
}


const Login = React.memo((props: LoginPropsType) => {
    const onSubmit = (formData: LoginFormType) => {
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)


    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <ContactForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
})
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login: loginTC})(Login)
