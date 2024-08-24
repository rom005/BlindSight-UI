import {useState} from "react";
import UploadImage from "./components/pages/UploadImage/UploadImage.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";
import Home from "./components/pages/Home/Home.tsx";
import {Option} from "./types/component.types.ts";
import {projectTitle} from "./config/metadata.config.ts";
import HeaderComponent from "./components/pages/HeaderComponent.tsx";
import CaptureImage from "./components/pages/CaptureImage/CaptureImage.tsx";

function App() {
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
        name: "Capture Image",
        content: CaptureImage
    },
    {
        name: "Upload Image",
        content: UploadImage
    }];

    const [currentPage, setCurrentPage] = useState(pages[0])

    const CurrentComponent = currentPage.content;

    return (
        <div className="flex gap-4 mb-8 w-screen h-full bg-content">
            <div className="w-1/4 h-full bg-side-bar"><SideBar title={projectTitle}
                                                               options={pages.map(page => page.name)}
                                                               setOption={changePage}/></div>
            <div className="flex-1 m-20 text-center"><CurrentComponent Header={
                () => <HeaderComponent text={currentPage.name}/>
            }/></div>
        </div>
    )
}

export default App
