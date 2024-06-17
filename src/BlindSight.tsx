import {useState} from "react";
import UploadImage from "./components/pages/UploadImage/UploadImage.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";
import Home from "./components/pages/Home/Home.tsx";
import {Option} from "./types/component.types.ts";

function BlindSight() {
    const changePage = (pageName: string) => {
        const page = pages.find(p => p.name === pageName);
        if (page) {
            setCurrentPage(page);
        }
    };

    const pages: Option[] = [{
        name: "Home",
        content: Home
    }, {
        name: "Upload New Image",
        content: UploadImage
    }];

    const [currentPage, setCurrentPage] = useState(pages[0])

    const CurrentComponent = currentPage.content;

    return (
        <>
            <div className="text-3xl font-bold underline">
                <SideBar options={pages.map(page => page.name)} setOption={changePage} />
            </div>
            <CurrentComponent/>
        </>
    )
}

export default BlindSight
