import React from "react"
import styles from './styles.module.css'

class Input extends React.Component {
    render() {
        const {name, id, type, label, placeholder, rows, value} = this.props
        return (
            <div className={styles.wrapper}>
                {type !== 'submit' && type !== 'reset' && <label htmlFor={id}>{label}</label>}
                {rows
                ?<textarea name={name} id={id} placeholder={placeholder} rows={rows}></textarea>
                :<input type={type} id={id} name={name} placeholder={placeholder} value={value}/>
                }
            </div>
        )
    }
}

export default Input