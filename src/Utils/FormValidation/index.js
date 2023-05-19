class FormValidation {
    constructor(obj) {
        this.obj = obj
    }

    handleSubmit(e, state) {
        e.preventDefault()

        let states = {
            errors: state.errors || {},
            messages: state.messages || {},
            inputs: state.inputs || {},
            permission: true
        }

        Array.from(e.target.elements).forEach((input) => {
            ({states} = this.required(this.obj[input.name]?.required, input, states))
        })

        if (states.errors) {
            Object.entries(states.errors).forEach(([key, value]) => {
                value !== null && states.permission && (states.permission = false)
            })
        }

        return states
    }

    handleChange(e, state) {
        let {name, value} = e.target

        let states = {
            errors: state.errors || {},
            messages: state.messages || {},
            inputs: state.inputs || {},
        }

        states.errors[name] = null
        states.messages[name] = null

        e.target.value = value.trimStart()

        let functions = Object.keys(this.obj[name])
        functions.unshift('default')

        functions.forEach(v => {
            this[v] && ({states, value} = this[v](this.obj[name][v], e.target, states))
            states.inputs[name] = value
        })

        return states
    }

    default(empty, {value, name}, states) {
        return {states, value}
    }

    required(message, {value, name}, states) {
        if (value.trim() === '') {
            states.messages[name] = null
            states.errors[name] = message
        }
        value = states.inputs[name]
        return {states, value}
    }

    capitalized(message, {value, name}, states) {
        if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
            states.errors[name] = message
        }
        return {states, value}
    }

    phone({limit, message}, {value, name}, states) {
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
            states.errors[name] = message
        }

        return {states, value}
    }

    url(bool, {value, name}, states) {
        if (!value.match(/https:\/\/[^\s]+/)) {
            states.errors[name] = 'Адрес должен соответствовать URL с расширением https'
        }
        return {states, value}
    }

    max({count, message, restMessage}, {value, name}, states) {
        if (value.length >= count + 1) {
            states.errors[name] = message
            value = value.slice(0, count + 1)
        }
        if (restMessage) {
            states.messages[name] = `Осталось ${value.length}/${count} символов`
        }
        return {states, value}
    }
}

export default FormValidation