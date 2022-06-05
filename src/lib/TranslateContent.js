import dayjs from "dayjs";
import translate_day from "./TranslateDay";

const translate_content = (content) => {

    if(!isNaN(Date.parse(content))){
        return dayjs(content).locale('es_es').format('DD/MM/YYYY HH:mm');
    } else {
        return translate_day(content);
    }

}

export default translate_content;