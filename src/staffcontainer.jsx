import { faCircleXmark, faEye, faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import StaffInfo from "./StaffInfo"
import EditStaff from "./editstaff"
import DeleteStaff from "./deletestaff"

function StaffContainer(props){
    const modalBase = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white border-1 border-gray-300 shadow-lg rounded transition-all duration-300";
    const modalOpen = "opacity-100 scale-100 pointer-events-auto";
    const modalClosed = "opacity-0 scale-95 pointer-events-none";

    return(
        <div className="p-4 border-1 mt-8 border-gray-300 bg-white rounded-md w-[30%]">
            <div className={`${modalBase} ${props.isSeen ? modalOpen : modalClosed}`}>
                {props.isSeen && (
                    <>
                        <StaffInfo
                            id={props.id}
                            username={props.username}
                            email={props.email}
                            phoneNumber={props.phoneNumber}
                            role={props.role}
                            dateCreated={props.dateCreated}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isEditable ? modalOpen : modalClosed}`}>
                {props.isEditable && (
                    <>
                        <EditStaff
                            id={props.id}
                            username={props.username}
                            email={props.email}
                            phoneNumber={props.phoneNumber}
                            role={props.role}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isRemovable ? modalOpen : modalClosed}`}>
                {props.isRemovable && (
                    <>
                        <DeleteStaff
                            username={props.username}
                            id={props.id}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
                <div className="flex justify-between">
                    <h3 className="font-bold text-xl text-wrap">{props.username}</h3>
                    <div>
                        {props.role === 'admin' && (
                            <div className="bg-red-500 rounded-2xl max-h-7 px-4 text-white"><p>Admin</p></div>
                        )}
                        {props.role === 'librarian' && (
                            <div className="bg-black rounded-2xl max-h-7 px-4 text-white"><p>Librarian</p></div>
                        )}
                    </div>
                </div>
                <p className="text-md mb-2">{props.email}</p>
                <p className="text-md mt-3">Phone: {props.phoneNumber}</p>
                <p className="text-md mt-3">Created: {props.dateCreated}</p>
                <p className="text-md mt-3">Role: {props.role}</p>
                <div className="flex mt-4 gap-4 justify-end">
                    <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onSee}><FontAwesomeIcon icon={faEye} /></div>
                    <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onEdit}><FontAwesomeIcon icon={faPencilSquare} /></div>
                    <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onRemove}><FontAwesomeIcon icon={faTrash} /></div>
                </div>
        </div>
    )
}
export default StaffContainer