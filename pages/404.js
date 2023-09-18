export default function Custom404() {
    return (
        <>
            <div className="text-center  flex flex-col gap-3 items-center justify-center h-screen">
                <h1 className="font-bold text-6xl">404: Page Not Found</h1>
                <p className='font-semibold text-2xl'>We're sorry! We could not find the page you were looking for.</p>
                <a className="text-2xl hover:text-gray-700" href="/">Back To Home</a>
            </div>
        </>
    )
}