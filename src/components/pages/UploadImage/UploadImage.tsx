import {ContentProps} from "../../../types/component.types.ts";
import {useRef, useState} from "react";
import {sendImageForTranslation} from "../../../api/controllers/braiileController.ts";
import loadingLogo from '../../../assets/images/loadinglogo.gif'
import {useSpeechSynthesis} from "react-speech-kit";

const UploadImage: React.FC<ContentProps> = ({Header}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState('/images/uploadImage.png');
    const [file, setFile] = useState<File>();
    const [translation, setTranslation] = useState<string>();
    const [loading, setLoading] = useState(false);
    const {speak, voices} = useSpeechSynthesis();

    const handleSpeak = () => {
        speak({
            text: translation || "",
            rate: 0.6,
            voice: voices[2] ? voices[2] : null
        });
    };

    const handleImageClick = () => {
        fileInputRef?.current?.click();
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
        if (!file) return
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
                        <div className={`text-black ${file && "cursor-pointer"}`}
                             onClick={translateUploadedImage}>Translate
                        </div>
                    </div>

                    {
                        loading ?
                            <img className="flex size-8 ml-auto mr-auto overflow-auto" src={loadingLogo}
                                 alt="loading..."/>
                            :
                            <div className="text-black">
                                {translation ?
                                    <div className="flex items-center justify-center">
                                        {translation}
                                        <img className="cursor-pointer size-5 overflow-auto ml-2"
                                             src="/src/assets/images/soundIcon.png" alt="speek" onClick={handleSpeak}/>
                                    </div>
                                    : ""}
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default UploadImage
