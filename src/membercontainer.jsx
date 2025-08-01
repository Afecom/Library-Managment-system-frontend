import { faCircleXmark, faClockRotateLeft, faEye, faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import EditMember from "./editmember";
import MemberInfo from "./memberinfo";
import DeleteMember from "./deletemember";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://library-managment-system-api.onrender.com'
})

axiosInstance.interceptors.request.use((config) =>{
  const token = localStorage.getItem('token')
  if (token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

function MemberContainer(props){
    const [borrows, setBorrows] = useState(null)
    useEffect(() => {
        async function borrowRecordFetcher(memberId){
            try{
                const response = await axiosInstance.get(`/members/${memberId}/borrowing-history`)
                const activeBorrows = response.data.length
                setBorrows(activeBorrows)
            }
            catch (error){
                console.error("Couldn't get the borrow record of the member", error)
            }
        }
        borrowRecordFetcher(props.id)
    })

    const modalBase = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white border-1 border-gray-300 shadow-lg rounded transition-all duration-300";
    const modalOpen = "opacity-100 scale-100 pointer-events-auto";
    const modalClosed = "opacity-0 scale-95 pointer-events-none";

    return(
        <div className="p-4 border-1 mt-8 border-gray-300 bg-white rounded-md">
            <div className={`${modalBase} ${props.isSeen ? modalOpen : modalClosed}`}>
                {props.isSeen && (
                    <>
                        <MemberInfo
                            id={props.id}
                            fullName={props.fullName}
                            email={props.email}
                            phoneNumber={props.phoneNumber}
                            joined={props.dateCreated}
                            activeBorrows={borrows}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isEditable ? modalOpen : modalClosed}`}>
                {props.isEditable && (
                    <>
                        <EditMember
                            id={props.id}
                            fullName={props.fullName}
                            email={props.email}
                            phoneNumber={props.phoneNumber}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className={`${modalBase} ${props.isRemovable ? modalOpen : modalClosed}`}>
                {props.isRemovable && (
                    <>
                        <DeleteMember
                            fullName={props.fullName}
                            id={props.id}
                            onCloseModal={props.onCloseModal}
                        />
                        <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 cursor-pointer" onClick={props.onCloseModal} />
                    </>
                )}
            </div>
            <div className="flex justify-between gap-8 w-82 max-w-82">
                <div>
                    <h3 className="font-bold text-xl text-wrap">{props.fullName}</h3>
                    <p className="text-md mb-2">{props.email}</p>
                </div>
                {borrows === 0 && (
                    <div className="bg-gray-200 rounded-2xl max-h-7 px-4 py-1"><p>0 active</p></div>
                )}
                {borrows > 0 && (
                    <div className="bg-black rounded-2xl max-h-7 px-4 text-white"><p>{borrows} active</p></div>
                )}
            </div>
            <p className="text-md mt-3">Phone: {props.phoneNumber}</p>
            <p className="text-md mt-3">Joined: {props.dateCreated}</p>
            <p className="text-md mt-3">Active Borrows: {borrows}</p>
            <div className="flex justify-end self-end mt-4 gap-4">
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onSee}><FontAwesomeIcon icon={faEye} /></div>
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" ><FontAwesomeIcon icon={faClockRotateLeft} /></div>
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onEdit}><FontAwesomeIcon icon={faPencilSquare} /></div>
                <div className="px-3 py-2 border-1 border-gray-300 rounded-md hover:cursor-pointer hover:bg-gray-100" onClick={props.onRemove}><FontAwesomeIcon icon={faTrash} /></div>
            </div>
        </div>
    )
}
export default MemberContainer