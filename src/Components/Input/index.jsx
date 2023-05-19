import React from "react"
import styles from './styles.module.css'

function Input(props) {
    const {name, id, type, label, placeholder, rows, value, onChange, onClick, state} = props

    return(
        <div className={styles.wrapper}>
            {type !== 'submit' && type !== 'reset' && <label htmlFor={id}>{label}</label>}
            {rows
            ?<textarea name={name} id={id} placeholder={placeholder} rows={rows} value={value || state?.inputs?.[name] || ''} onChange={onChange}></textarea>
            :<input type={type} id={id} name={name} placeholder={placeholder} value={value || state?.inputs?.[name] || ''} onChange={onChange} onClick={onClick}/>
            }
            {state?.messages?.[name] && <span className={styles.message}>{state?.messages?.[name]}</span>}
            {state?.errors?.[name] && <span className={styles.error}>{state?.errors?.[name]}</span>}
        </div>
    )
}

export default Input