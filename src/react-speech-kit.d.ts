declare module 'react-speech-kit' {
    export function useSpeechSynthesis(): {
        speak: (args: { text: string, rate?: number, voice?: object | null }) => void;
        cancel: () => void;
        speaking: boolean;
        supported: boolean;
        voices: SpeechSynthesisVoice[];
    };

    export function useSpeechRecognition(options?: {
        onResult?: (result: string) => void;
        onEnd?: () => void;
        onError?: (event: any) => void;
    }): {
        listen: () => void;
        listening: boolean;
        supported: boolean;
        stop: () => void;
        finalTranscript: string;
    };
}
