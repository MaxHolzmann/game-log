export default function Description() {
    const { data: session, status } = useSession();

    return (
        <>
            <div className="text-center pb-10">
                <h1 className="m-10 text-6xl font-semibold">Simple & Elegant</h1>
                <p className='font-medium text-2xl px-5'>Game Log helps take the decision making out of your next gaming adventure by utilizing a simple three category Kanban style board.</p>
                {/* screenshot of board here */}
                <img src="/preview.jpeg"></img>
            </div>
        </>
    )
}
