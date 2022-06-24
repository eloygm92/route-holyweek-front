
const translate_day = (day) => {
    if(day === 'Palm Sunday'){
        return 'Domingo de Ramos'
    } else if(day === 'Monday'){
        return 'Lunes'
    } else if(day === 'Tuesday'){
        return 'Martes'
    } else if(day === 'Wednesday'){
        return 'Miércoles'
    } else if(day === 'Thursday'){
        return 'Jueves'
    } else if(day === 'Friday'){
        return 'Viernes'
    } else if(day === 'Saturday'){
        return 'Sábado'
    } else if(day === 'Easter Sunday') {
        return 'Domingo de Resurrección'
    } else {
        return day;
    }
}

export default translate_day;