import React from "react"
import styles from './styles.module.css'
import {Input} from '../../Components'

class Form extends React.Component {
    render() {

        return (
            <div className={styles.wrapper}>
                <h1>Создание анкеты</h1>
                <form action="" onSubmit={e => {e.preventDefault(); console.log(e.target.elements)}}>
                    <div className={styles.horizon}>
                        <Input name='name' id='name' type='text' label='Имя' placeholder='Илья'/>
                        <Input name='surname' id='surname' type='text' label='Фамилия' placeholder='Лысов'/>
                    </div>
                    <div className={styles.horizon}>
                        <div className={styles.vertical}>
                            <div className={styles.horizon}>
                                <Input name='date' id='date' type='date' label='Дата рождения'/>
                            </div>
                            <div className={styles.horizon}>
                                <Input name='phone' id='phone' type='tel' label='Телефон' placeholder='+995 234 233 399'/>
                            </div>
                            <div className={styles.horizon}>
                                <Input name='url' id='url' type='url' label='Сайт' placeholder='www...'/>
                            </div>
                        </div>
                        <Input name='about' id='about' type='text' label='О себе' placeholder='Опыт работы...' rows='7'/>
                    </div>
                    <div className={styles.horizon}>
                        <Input name='stack' id='stack' type='text' label='Стек технологий' placeholder='ReactJS, NodeJS...' rows='7'/>
                        <Input name='description' id='description' type='text' label='Описание последнего проекта' placeholder='Приложение для работы с...' rows='7'/>
                    </div>
                    <div className={styles.horizon}>
                        <Input type='reset' value='Отмена'/>
                        <Input type='submit' value='Отправить'/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form