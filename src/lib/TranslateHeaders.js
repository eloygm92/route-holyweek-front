
const translate_header = (header) => {
    if(header === '_id') {
        return 'ID';
    } else if (header === 'name') {
        return 'Nombre';
    } else if (header === 'nick') {
        return 'Apodo';
    } else if (header === 'foundation') {
        return 'Fundación';
    } else if (header === 'procession_day') {
        return 'Día de la Procesión';
    }
}

export default translate_header;