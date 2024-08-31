import { ContentProps } from "../../../types/component.types.ts";
import React from "react";

const Home: React.FC<ContentProps> = ({Header}) => {

    return (
        <>
            <Header/>
            <img src="/src/assets/images/alphabet.png" alt="alphabet" className="flex size-128 object-fill m-auto opacity-60"/>
        </>
    )
}

export default Home
