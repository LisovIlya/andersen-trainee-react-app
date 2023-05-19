import React from "react"
import styles from './styles.module.css'
import {Input} from '../'
import { inputs } from "../../Data/inputs"
import { FormValidation } from "../../Utils"

function Form({state, setState}) {

    const required = 'Поле пустое. Заполните пожалуйста'
    const capitalized = 'Слово должно начинаться с большой буквы'

    const validation = new FormValidation({
        name: {capitalized: capitalized, required: required},
        surname: {capitalized: capitalized, required: required},
        phone: {phone: {limit: 9, message: 'Номер не заполнен'}, required: required},
        date: {required: required},
        url: {url: true, required: required},
        about: {max: {count: 600, message: 'Превышен лимит символов в поле', restMessage: true}, required: required},
        stack: {max: {count: 600, message: 'Превышен лимит символов в поле', restMessage: true}, required: required},
        description: {max: {count: 600, message: 'Превышен лимит символов в поле', restMessage: true}, required: required}
    })

    const handleChange = (e) => setState(validation.handleChange(e, state))
    
    const handleSubmit = (e) => setState(validation.handleSubmit(e, state))

    const handleReset = () => {
        setState({
            inputs: null,
            errors: null,
            messages: null
        })
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                    <h1>Создание анкеты</h1>
                    {inputs.map((obj, i) => <Input {...obj} key={i} state={state} onChange={handleChange}/>)}
                    <div className={styles.horizon}>
                        <Input type='reset' value='Отмена' onClick={handleReset}/>
                        <Input type='submit' value='Отправить'/>
                    </div>
                </form>
        </div>
    )
}

export default Form