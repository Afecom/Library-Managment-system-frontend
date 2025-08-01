import { faBookOpen, faCalendar, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { returnBk } from "./pages/borrowreturn"

function BorrowsReturns(props){
    const returnBook = useContext(returnBk)

    return(
        <div className="border-1 border-gray-300 bg-white w-full m-auto p-4 rounded-md mt-6">
            <div className="flex justify-between">
                <div>
                    <div>
                        <div className="flex items-center gap-3 text-xl">
                            <FontAwesomeIcon icon={faBookOpen} />
                            <h2 className="font-bold">{props.title}</h2>
                        </div>
                        <div className="flex gap-4 items-center mt-2 text-gray-400">
                            <FontAwesomeIcon icon={faUser} />
                            <h2 className="font-bold">{props.member}</h2>
                        </div>
                    </div>
                    <div className="md:flex md:gap-64">
                        <div className="flex items-center gap-4 mt-8">
                            <FontAwesomeIcon icon={faCalendar} className="text-xl"/>
                            <div className="flex flex-col">
                                <p>Borrowed:</p>
                                <p>{props.borrowed}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                            <FontAwesomeIcon icon={faCalendar} className="text-xl"/>
                            <div className="flex flex-col">
                                <p>Due:</p>
                                <p>{props.due}</p>
                            </div>
                        </div>
                    </div>
                    {(props.status === 'active' && !props.returned) && (<button className="p-4 bg-black text-white rounded-xl mt-6 mb-2 hover:bg-gray-800 hover:cursor-pointer" onClick={() => returnBook(true)}>Mark as Returned</button>)}
                </div>
                {(props.status === 'active' && !props.returned) && (<div className="bg-black rounded-2xl py-1 px-4 max-h-8 text-white"><p>Active</p></div>)}
                {(props.status === 'overdue' && !props.returned) && (<div className="bg-red-500 rounded-2xl py-1 px-4 max-h-8 text-white"><p>Overdue</p></div>)}
                {props.returned && (<div className="bg-gray-200 rounded-2xl py-1 px-4 max-h-8"><p>Returned</p></div>)}
            </div>
        </div>
    )
}

export default BorrowsReturns