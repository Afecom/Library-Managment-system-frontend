import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

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

function EditStaff(props){

    async function submitHandler(e){
        e.preventDefault();

        const form = e.target
        const username = form.elements.username.value
        const email = form.elements.email.value
        const phoneNumber = form.elements.phoneNumber.value
        const role = form.elements.role.value
        const staffId = props.id 

        try{
            const response = await axiosInstance.patch(`/staff/${staffId}`, {
                username: `${username}`,
                email: `${email}`,
                role: `${role}`,
                phone_number: `${phoneNumber}`,
            })
            console.log(response)
            if (response.request.status === 200){
                window.location.href = "/staffs"
            }
        }
        catch(error){
            alert("Couldn't perform the requested action")
            console.error("Couldn't update the staff member", error)
        }
    }

    return(
        <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white shadow-3xl shadow-gray-300 rounded-md">
            <h1 className="text-center font-bold text-2xl">Edit Staff Member</h1>
            <p className="text-center">Update the staff member information below.</p>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-2xl hover:cursor-pointer" onClick={props.onCloseModal}/>
            <form onSubmit={submitHandler}>
                <div className="mt-4">
                    <label htmlFor="usernameInput">Username</label><br />
                    <input required type="text" id="usernameInput" name="username" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.username} placeholder="Enter Username"/>
                </div>
                <div className="mt-4">
                    <label htmlFor="emailAddressInput">Email Address</label><br />
                    <input required type="text" id="emailAddressInput" name="email" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.email} placeholder="Enter email"/>
                </div>
                <div className="mt-4">
                    <label htmlFor="phoneNumberInput">Phone Number</label><br />
                    <input required type="text" id="phoneNumberInput" name="phoneNumber" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.phoneNumber} placeholder="Enter Phone Number"/>
                </div>
                <div className="mt-4">
                    <label htmlFor="roleSelect">Role</label><br />
                    <select required name="role" id="roleSelect" className="p-2  w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.role}>
                        <option value={'admin'} >Admin</option>
                        <option value={'librarian'} >Librarian</option>
                    </select>
                </div>
                <div className="mt-4">
                    <button type="submit" className="w-full py-2 bg-black text-white rounded-md mb-4 hover:bg-gray-800 hover: cursor-pointer">Update Staff</button>
                    <button type="reset" className="w-full py-2 rounded-md mb-4 border-1 border-gray-300 hover:bg-gray-300 hover: cursor-pointer" onClick={props.onCloseModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default EditStaff