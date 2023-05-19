import React from "react"
import styles from './styles.module.css'
import { inputs } from "../../Data/inputs"

function Sheet({state}) {
    return(
        <div className={styles.wrapper}>
            <h1>{[state.inputs.name, state.inputs.surname].join(' ')}</h1>
            {inputs.map((obj, i) => (
                obj.name !== 'name' && obj.name !== 'surname' &&
                    <div className={styles.block} key={i}>
                        <div className={styles.property}>{obj.label}</div>
                        <div className={styles.value}>{state.inputs[obj.name]}</div>
                    </div>
            )
            )}
        </div>
    )
}

export default Sheet