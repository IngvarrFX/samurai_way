import React from "react"
import styles from "./FormControls.module.css"
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form/lib/Field";


type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}


const FormControl: React.FC<FormControlsPropsType> = ({meta: {touched, error}, children}) => {
    const errorMessage = touched && error
    return (
        <div className={styles.formControls + " " + (errorMessage ? styles.error : " ")}>
            <div>
                {children}
                {errorMessage && <span>{error}</span>}
            </div>

        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
    )
}


export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}