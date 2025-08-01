import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function RecentActivity(props){
    if (props.action === 'Borrowed'){
        return(
        <div className="flex w-full m-auto gap-10 p-4 bg-gray-100 rounded-md mt-6">
            <FontAwesomeIcon icon={props.icon} className="self-center p-4 bg-blue-200 text-blue-600 rounded-full"/>
            <div>
                <h5 className="font-bold text-xl md:text-lg"><span>{props.action}: </span>{props.title}</h5>
                <p className="text-xl md:text-lg">Member: {props.member} - {props.date}</p>
            </div>
        </div>
    )
    }
    else if (props.action === 'Returned'){
        return(
        <div className="flex w-full m-auto gap-8 p-4 bg-gray-100 rounded-md mt-6">
            <FontAwesomeIcon icon={props.icon} className="self-center p-4 bg-green-200 text-green-600 rounded-full"/>
            <div>
                <h5 className="font-bold text-xl md:text-lg"><span>{props.action}: </span>{props.title}</h5>
                <p className="text-xl md:text-lg">Member: {props.member} - {props.date}</p>
            </div>
        </div>
        )
    }
}
export default RecentActivity