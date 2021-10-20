import React, {ChangeEvent} from "react";
import style from "./ProfileStatus.module.css"

type PropsType = {
    status: string
    updateProfileStatus: (status: string) => void
}

type ProfileStateType  = {
    EditableSpan: boolean
    status: string
}

export class ProfileStatus extends React.Component<PropsType> {
    state = {
        EditableSpan: false,
        status: this.props.status
    };

    activateEdit = () => {
        this.setState({EditableSpan: true});
    }

    deActivateEdit = () => {
        this.setState({EditableSpan: false})
        this.props.updateProfileStatus(this.state.status)
    }

    changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: PropsType, prevState: ProfileStateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div className={style.status}>
                {!this.state.EditableSpan
                    ?
                    <div>
                        <span
                            onDoubleClick={this.activateEdit}>{this.props.status || "Change your profile status"}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus onChange={this.changeStatus} onBlur={this.deActivateEdit.bind(this)}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}