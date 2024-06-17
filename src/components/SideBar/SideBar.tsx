import SideBarOption from "./SideBarOption.tsx";

interface SideBarProps {
    options: string[],
    setOption: (option: string) => void
}

const SideBar: React.FC<SideBarProps> = ({options, setOption}) => {

    return (
        <>
            <div className="text-3xl font-bold underline">
                {options.map((option, index) => (
                    <div onClick={() => setOption(option)} className="cursor-pointer">
                        <SideBarOption option={option} key={index} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default SideBar
