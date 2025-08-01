import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QuickActions (props){
    const navigate = useNavigate();
    const color = props.color
    function navigationHandler(){
        navigate(props.navigate);
    }
    
    if (color === 'black'){
        return (
            <button type="button" onClick={navigationHandler} className='flex flex-col gap-6 bg-black text-xl md:text-md text-white w-full 
            px-8 py-3 rounded-md mt-6 md:w-[22%] hover:bg-gray-900 hover:cursor-pointer'><FontAwesomeIcon icon={props.icon} className='text-xl md:text-md'/>{props.button}</button>
        )
    }
    else if (color === 'red'){
        return(
            <button type="button" onClick={navigationHandler} className='flex flex-col gap-6 bg-red-100 text-xl md:text-md text-red-900 w-full 
            px-8 py-3 rounded-md mt-6 border-1 border-red-400 md:w-[22%] hover:bg-red-200 hover:cursor-pointer'><FontAwesomeIcon icon={props.icon} className='text-xl md:text-md'/>{props.button}</button>
        )
    }
    else{
        return(
            <button type="button" onClick={navigationHandler} className='flex flex-col gap-6 bg-white text-xl md:text-md w-full px-8 py-3 
            rounded-md mt-6 border-1 border-gray-300 md:w-[22%] hover:bg-gray-100 hover:cursor-pointer'><FontAwesomeIcon icon={props.icon} className='text-xl md:text-md'/>{props.button}</button>
        )
    }
}

export default QuickActions