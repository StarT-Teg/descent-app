import axios from "axios";
import {useMutation} from "react-query";

export interface TranslationDataInterface {
    stringToTranslate: string;
    translation: string;
    language: string;
}

export const useSetTranslation = () => {

    const headers = {
        "Content-Type": "text/plain",
    }

    const query = (translationData: TranslationDataInterface) => axios
        .post(`https://script.google.com/macros/s/AKfycbxnlwe3-rDDjlfPDhUyeVNijBnF2Hj_5pa56s8JgVXbGmAZHPtSddVXWCRHspfwF_KZhw/exec`, JSON.stringify({data: translationData}), {headers})
        .then(response => response);

    return useMutation(`set-translation`, query, {})
}
