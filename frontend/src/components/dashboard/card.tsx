import { Link } from "react-router-dom"

type WorkspaceType = {
    id: string
    name: string
    description?: string
}

export default function Card ({id, name, description}: WorkspaceType) {
    return (
        <Link 
        to={`/dashboard/${id}`}>
            <div className="w-[250px] h-[100px] border-2 bg-blue-400 shadow-sm p-2 rounded-md mt-3">
                <h1 className="text-lg font-bold">
                    {name}
                </h1>
                <p className="text-[16px] font-[400]">
                    {description}
                </p>
            </div>
        </Link>
    )
}