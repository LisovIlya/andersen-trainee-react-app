import React, {useState} from "react"
import styles from './styles.module.css'
import { Form, Sheet } from "../../Components"

function FormPage() {
    const [state, setState] = useState({
        inputs: null,
        permission: false,
        errors: null,
        messages: null
    })
    
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {state.permission ?
                <Sheet state={state} />
                :
                <Form state={state} setState={setState}/>
                }
            </div>
        </div>
    )
}

export default FormPage