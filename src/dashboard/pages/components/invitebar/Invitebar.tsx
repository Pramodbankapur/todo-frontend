import { FiPlus } from "react-icons/fi"

export default function Invitebar(){
    const name = 'Pramod'
    return (
        <div>
            <div>
            <h3>Hello , {name}</h3>
            </div>

            {/* Rigth Action */}
            <button >
                <FiPlus size={18}/>
                Invite
            </button>
            
        </div>
    )
}