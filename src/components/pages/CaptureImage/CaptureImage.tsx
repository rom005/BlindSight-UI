import { ContentProps } from "../../../types/component.types.ts";
import { useRef, useState } from "react";
import { sendImageForTranslation } from "../../../api/controllers/braiileController.ts";
import loadingLogo from '../../../assets/images/loadinglogo.gif';

const CaptureImage: React.FC<ContentProps> = ({ Header }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [translation, setTranslation] = useState<string>();
    const [loading, setLoading] = useState(false);

    const startCamera = () => {
        setCapturedImage(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                })
                .catch((err) => {
                    console.error("Error accessing camera:", err);
                });
        }
    };

    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageDataUrl = canvasRef.current.toDataURL('image/png');
                setCapturedImage(imageDataUrl);

                // Stop the camera stream
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        }
    };

    const translateCapturedImage = () => {
        if (!capturedImage) return;
        setLoading(true);
        if (capturedImage) {
            fetch(capturedImage)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "captured_image.png", { type: 'image/png' });
                    return sendImageForTranslation(file);
                })
                .then((translation) => {
                    setLoading(false);
                    setTranslation(translation);
                });
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center">
                <div className="flex-col">
                    <canvas ref={canvasRef} className="hidden size-96" width={384} height={384}></canvas>

                    {capturedImage ? (
                        <>
                            <img src={capturedImage} alt="Captured Image" className="size-96 object-fill"/>
                            <div className="text-black cursor-pointer" onClick={startCamera}>Retake</div>
                        </>
                    ) : (
                        <>
                            <video ref={videoRef} className="size-96 object-fill"/>
                            <div className="text-black cursor-pointer" onClick={startCamera}>Start Camera</div>
                        </>
                    )}



                    <div className="flex justify-around my-3">
                        <div className="text-black cursor-pointer" onClick={captureImage}>Capture</div>
                        <div className={`text-black ${capturedImage && "cursor-pointer"}`} onClick={translateCapturedImage}>Translate</div>
                    </div>

                    {
                        loading ?
                            <img className="flex size-8 ml-auto mr-auto overflow-auto" src={loadingLogo}
                                 alt="loading..."/>
                            :
                            <div className="text-black">
                                {translation ? `"${translation}"` : ""}
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default CaptureImage;
