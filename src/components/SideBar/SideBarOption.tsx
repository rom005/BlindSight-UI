interface SideBarOptionProps {
    option: string
}

const SideBarOption: React.FC<SideBarOptionProps> = ({option}) => {

    return (
        <>
            <div className="text-3xl font-bold underline">
                {option}
            </div>
        </>
    )
}

export default SideBarOption
