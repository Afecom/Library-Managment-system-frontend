import { faEdit, faTrashAlt, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EditGenre from "./editgenre";
import DeleteGenre from "./deletegenre";

function GenresContainer(props){
    const modalBase = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white border-1 border-gray-300 shadow-lg rounded transition-all duration-300";
    const modalOpen = "opacity-100 scale-100 pointer-events-auto";
    const modalClosed = "opacity-0 scale-95 pointer-events-none";

    return(
        <div className="bg-white border-1 border-gray-300 p-4 shadow-md shadow-gray-400 rounded-md mt-4 flex justify-between">
            <div className={`${modalBase} ${props.isEditable ? modalOpen : modalClosed}`}>
                {props.isEditable && (
                    <>
                        <EditGenre
                            name={props.name}
                            id={props.id}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isRemovable ? modalOpen : modalClosed}`}>
                {props.isRemovable && (
                    <>
                        <DeleteGenre
                            name={props.name}
                            id={props.id}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div>
                <h1 className="font-bold text-3xl mb-8">{props.name}</h1>
                <p className="text-xl mb-4">Genre ID: {props.id}</p>
            </div>
            <div className="flex justify-end gap-8">
                <FontAwesomeIcon icon={faEdit} className="px-3 py-2 bg-white border-1 border-gray-400 hover:cursor-pointer hover:bg-gray-300 rounded-md text-xl" onClick={props.onEdit}/>
                <FontAwesomeIcon icon={faTrashAlt} className="px-3 py-2 bg-white border-1 border-gray-400 hover:cursor-pointer hover:bg-gray-300 rounded-md text-xl" onClick={props.onRemove}/>
            </div>
        </div>
    )
}
export default GenresContainer