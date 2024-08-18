import axios from 'axios';
import FormData from 'form-data';
import {HTTP, PORT, TRANSLATION_SERVER_URL} from '../../config/server.config';

export const sendImageToTranslationServer = async (image: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', image);

        const response = await axios.post(`${HTTP}://${TRANSLATION_SERVER_URL}:${PORT}/predict/predicted-word`, formData);

        return response.data;
    } catch (error) {
        throw error;
    }
};
