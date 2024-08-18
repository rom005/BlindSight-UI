interface SideBarOptionProps {
    option: string
}

const SideBarOption: React.FC<SideBarOptionProps> = ({option}) => {

    return (
        <>
            <div className="text-2xl font-poppins-light cursor-pointer overflow-hidden">
                {option}
            </div>
        </>
    )
}

export default SideBarOption
