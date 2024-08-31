import SideBarOption from "./SideBarOption.tsx";

interface SideBarProps {
    title: string,
    options: string[],
    setOption: (option: string) => void
}

const SideBar: React.FC<SideBarProps> = ({title, options, setOption}) => {

    return (
        <>
            <div id="sidebar" className="flex flex-col m-3">
                <div className="text-3xl m-8 cursor-default self-center">
                    {title}
                </div>
                <div className="content-start">
                    {options.map((option, index) => (
                        <div key={option} onClick={() => setOption(option)} className="m-6 p-1">
                            <SideBarOption option={option} key={index}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SideBar
