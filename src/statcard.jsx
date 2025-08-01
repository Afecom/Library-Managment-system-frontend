import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function StatCard(props){
    if (props.overdue){
        return(
         <div className="flex gap-8 justify-between bg-white shadow-gray-300 rounded-lg my-8 py-4 px-8">
            <div>
                <h6 className="text-xl">{props.title}</h6>
                <h1 className="font-bold text-3xl mt-2 text-red-600">{props.data}</h1>
                <p className="text-gray-500 mt-2">{props.meta}</p>
            </div>
            <FontAwesomeIcon icon={props.icon} className="text-red-600"/>
        </div>
        
    )
    }
    else{
        return(
         <div className="flex md: gap-8 justify-between bg-white shadow-gray-300 rounded-lg my-8 py-4 px-8">
            <div>
                <h6 className="text-xl">{props.title}</h6>
                <h1 className="font-bold text-3xl mt-2">{props.data}</h1>
                <p className="text-gray-500 mt-2">{props.meta}</p>
            </div>
            <FontAwesomeIcon icon={props.icon} />
        </div>
        
    )
    }
    
}

export default StatCard