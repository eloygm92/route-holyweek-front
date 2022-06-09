import dayjs from "dayjs";
import translate_day from "./TranslateDay";

const translate_content = (content) => {

    if(!isNaN(Date.parse(content))){
        let date = dayjs(content).locale('es_es').format('DD/MM/YYYY HH:mm');
        if(date !== '01/01/1970 01:00')
            return date;
        return translate_day(content);
    } else {
        return translate_day(content);
    }

}

export default translate_content;