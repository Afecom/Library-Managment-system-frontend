import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useLocation } from 'react-router-dom'
import { sidebarContext } from "./header-navigatorlayout";
import { useContext } from "react";

function AsideNavigator(props){
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === props.navigate;
    const setIsSideBarOpen = useContext(sidebarContext)

    function clickHandler(){
        navigate(props.navigate)
        setIsSideBarOpen(false)
    }

    return(
        <div>
            <button
                className={`py-2 px-4 flex gap-4 md:gap-2 rounded-md mt-4 transition-colors
                    ${isActive ? 'bg-blue-100 text-blue-900 font-bold' : 'bg-transparent'}
                    hover:bg-blue-50 w-full`}
                onClick={clickHandler}
            >
                <FontAwesomeIcon icon={props.icon} className="text-xl md:text-sm self-center"/>
                <p className="text-xl md:text-sm">{props.button}</p>
            </button>
        </div>
    )
}
export default AsideNavigator