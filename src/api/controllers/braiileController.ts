import * as brailleService from '../services/brailleService';

export const sendImageForTranslation = async (image: File): Promise<string> => {
    try {
        if (!image) {
            throw new Error('No image file provided');
        }
        return await brailleService.sendImageToTranslationServer(image);
    } catch (error) {
        throw (error);
    }
};
