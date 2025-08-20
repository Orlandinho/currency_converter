export default function Button({name}) {
    return (
        <>
            <button
                type="button"
                className="rounded-sm bg-neutral-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
            >
                {name ?? 'Button'}
            </button>
        </>
    )
}
