interface HeaderComponentProps {
    text: string
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({text}) => {
    return (
        <>
            <div className="text-4xl font-poppins-bold text-black mb-10">
                { text }
            </div>
        </>
    )
}

export default HeaderComponent
