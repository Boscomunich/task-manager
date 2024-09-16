
type CardType = {
    id: string
    name: string
    description: string
}

export default function CardDisplay ({id, name, description}: CardType) {
    return (
        <div className="w-full h-auto py-2 px-3 bg-slate-200 my-2 rounded-sm">
            <h1>
                {name}
            </h1>
        </div>
    )
}