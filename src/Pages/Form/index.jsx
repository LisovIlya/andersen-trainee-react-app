import React from "react"
import styles from './styles.module.css'
import {Input} from '../../Components'

class Form extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputs: null,
            permission: false,
            errors: null,
            messages: null
        }
        this.inputs = [
            {
                name: 'name',
                id: 'name',
                type: 'text',
                label: 'Имя',
                placeholder: 'Илья',
            },
            {
                name: 'surname',
                id: 'surname',
                type: 'text',
                label: 'Фамилия',
                placeholder: 'Иванов',
            },
            {
                name: 'date',
                id: 'date',
                type: 'date',
                label: 'Дата рождения',
            },
            {
                name: 'phone',
                id: 'phone',
                type: 'tel',
                label: 'Телефон',
                placeholder: '7-7777-77-77',
            },
            {
                name: 'url',
                id: 'url',
                type: 'url',
                label: 'Сайт',
                placeholder: 'https://developer.mozilla.org/',
            },
            {
                name: 'about',
                id: 'about',
                type: 'text',
                label: 'О себе',
                placeholder: 'Опыт работы...',
                rows: 7,
            },
            {
                name: 'stack',
                id: 'stack',
                type: 'text',
                label: 'Стек технологий',
                placeholder: 'ReactJS, NodeJS...',
                rows: 7,
            },
            {
                name: 'description',
                id: 'description',
                type: 'text',
                label: 'Описание последнего проекта',
                placeholder: 'Приложение для работы с...',
                rows: 7,
            }
        ]
    }
    
    handleChange = (e) => {
        let {name, value} = e.target
        const errors = this.state.errors || {}
        const messages = this.state.messages || {}
        const inputs = this.state.inputs || {}

        errors[name] = null
        messages[name] = null

        value = value.trimStart()

        if (value.trim() === '') {
            errors[name] = 'Поле пустое. Заполните пожалуйста'
        } else {
            if (name === 'name' || name === 'surname') {
                if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
                    errors[name] = 'Слово должно начинаться с большой буквы'
                }
            }
            if (name === 'phone') {
                const limit = 9
                let number = value.replace(/[^\d]/g, "")
                number = number.slice(0, limit)

                if (number.length <= limit) {
                    value = number.replace(/^(\d{1})(\d{0,4})?(\d{0,2})?(\d{0,2})?$/, function(match, p1, p2, p3, p4) {
                        let formatted = "";
                        p1 && (formatted += p1)
                        p2 && (formatted += '-' + p2)
                        p3 && (formatted += '-' + p3)
                        p4 && (formatted += '-' + p4)
    
                        return formatted;
                    });
                }
                if (!value.match(/^\d{1}-\d{4}-\d{2}-\d{2}$/)) {
                    errors[name] = 'Номер не заполнен'
                }
            }
            if (name === 'url') {
                if (!value.match(/https:\/\/[^\s]+/)) {
                    errors[name] = 'Адрес должен соответствовать URL с расширением https'
                }
            }
            if (name === 'about' || name === 'stack' || name === 'description') {
                const limit = 600
                if (value.length >= limit + 1) {
                    errors[name] = 'Превышен лимит символов в поле'
                    value = value.slice(0, limit + 1)
                }
                messages[name] = `Осталось ${value.length}/${limit} символов`
            }
        }

        inputs[name] = value

        this.setState({
            inputs,
            errors,
            messages
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const errors = this.state.errors || {}

        Array.from(e.target.elements).forEach((input) => {
            const {name, value} = input
            if (value.trim() === '') {
                errors[name] = 'Поле пустое. Заполните пожалуйста'
            }
        })

        this.setState({errors})

        let permission = true

        if (errors) {
            const entries = Object.entries(errors)
            entries.forEach(([key, value]) => {
                if (value !== null && permission) {
                    permission = false
                }
            })
        }
        
        if (permission) {
            this.setState({permission})
        } else {
            alert('Форма не заполнена')
        }
    }

    handleReset = () => {
        this.setState({
            inputs: null,
            errors: null,
            messages: null
        })
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.state.permission ? 
                <div className={[styles.preview, styles.form].join(' ')}>
                    <h1>{[this.state.inputs.name, this.state.inputs.surname].join(' ')}</h1>
                    {this.inputs.map((obj, i) => (
                        obj.name !== 'name' && obj.name !== 'surname' &&
                            <div className={styles.block} key={i}>
                                <div className={styles.property}>{obj.label}</div>
                                <div className={styles.value}>{this.state.inputs[obj.name]}</div>
                            </div>
                    )
                    )}
                </div>
                :
                <form onSubmit={this.handleSubmit} className={styles.form}>
                    <h1>Создание анкеты</h1>
                    {this.inputs.map((obj, i) => <Input {...obj} key={i} state={this.state} onChange={this.handleChange}/>)}
                    <div className={styles.horizon}>
                        <Input type='reset' value='Отмена' onClick={this.handleReset}/>
                        <Input type='submit' value='Отправить'/>
                    </div>
                </form>
                }
            </div>
        )
    }
}

export default Form