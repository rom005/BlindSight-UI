import {ContentProps} from "../../../types/component.types.ts";
import {useRef, useState} from "react";
import {sendImageForTranslation} from "../../../api/controllers/braiileController.ts";
import loadingLogo from '../../../assets/images/loadinglogo.gif'

const UploadImage: React.FC<ContentProps> = ({Header}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState('/images/uploadImage.png');
    const [file, setFile] = useState<File>();
    const [translation, setTranslation] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleImageClick = () => {
        fileInputRef?.current?.click();

        return
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);

            console.log('File selected:', uploadedImage);
        }
    };

    const translateUploadedImage = () => {
        setLoading(true);
        if (file) {
            sendImageForTranslation(file)
                .then((translation) => {
                    setLoading(false);
                    setTranslation(translation)
                });
        }
    }

    return (
        <>
            <Header/>
            <div className="flex justify-center">
                <div className="flex-col">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div onClick={handleImageClick} className="cursor-pointer">
                        <img src={uploadedImage} alt="Upload Image" className="size-96 object-fill"/>
                    </div>
                    <div className="flex justify-around my-3">
                        <div className="text-black cursor-pointer" onClick={handleImageClick}>Upload</div>
                        <div className="text-black cursor-pointer" onClick={translateUploadedImage}>Translate</div>
                    </div>

                    {
                        loading ?
                            <img className="flex size-8 ml-auto mr-auto overflow-auto" src={loadingLogo} alt="loading..."/>
                            :
                            <div className="text-black">
                                {translation ? `"${translation}"` : ""}
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default UploadImage
