export default function Container({children}) {

    return (
        <>
            <div className='min-h-screen bg-neutral-100'>
                <div className="py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-neutral-100 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-neutral-900">
                                <h1 className='text-2xl text-center'>Currency Converter</h1>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}