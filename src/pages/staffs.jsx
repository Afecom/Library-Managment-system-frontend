import { useContext, useState } from "react"
import { staffContext } from "../App"
import axios from "axios"
import StaffContainer from "../staffcontainer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faAdd, faSearch } from "@fortawesome/free-solid-svg-icons"
import Search from "../searchcomponent"

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

function Staffs(){
    const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [activeModal, setActiveModal] = useState({ type: null, staffId: null })
    const showOverlay = !!activeModal.type || isAddStaffOpen

    async function submitHandler(e){
        e.preventDefault()

        const form = e.target
        if (password !== confPassword){
            alert('passwords do not match')
        }
        else {
        const userName = form.elements.username.value
        const emailAddress = form.elements.emailAddress.value
        const phoneNumber = form.elements.phoneNumber.value
        const role = form.elements.role.value
        const password = form.elements.password.value

        try{
            const response = await axiosInstance.post('/auth/signup', {
                                username: `${userName}`,
                                email: `${emailAddress}`,
                                password: `${password}`,
                                role: `${role}`,
                                phone_number: `${phoneNumber}`,
                            });
            if (response.request.status === 201){
                window.location.href = "/staffs"
            }
        }
        catch (error){
            alert("Couldn't perform the requested action")
            console.error("there was an error posting the data", error)
        }
        }
    }

    return(
        <div className="p-4 px-5">
            {showOverlay && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                    onClick={() => {
                        setActiveModal({ type: null, staffId: null })
                        setIsAddStaffOpen(false)
                    }}
                />
            )}
            {isAddStaffOpen && (
                            <form className="p-4 bg-white absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-lg m-auto z-50 rounded shadow-lg transition-all duration-300" onSubmit={submitHandler}>
                                <h1 className="text-center">Add New Staff Member</h1>
                                <p className="text-center">Enter the details for the new staff member.</p>
                                <FontAwesomeIcon icon={faX} className="absolute right-6 top-6 hover:cursor-pointer hover:bg-black px-2 py-2 rounded-md hover:text-white" onClick={() => setIsAddStaffOpen(false)}/>
                                <div className="mt-6">
                                    <label htmlFor="usernameInput">Username</label><br />
                                    <input type="text" id="titlusernameInput" name="username" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter username"/><br />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="emaiAddressInput">Email Address</label><br />
                                    <input type="text" id="emaiAddressInput" name="emailAddress" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter email address"/><br />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="phoneNumberInput">Phone Number</label><br />
                                    <input type="tel" id="phoneNumberInput" name="phoneNumber" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter Phone Number"/>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="roleSelect">Role</label><br />
                                    <select name="role" id="roleSelect" defaultValue={"librarian"} className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required>
                                        <option value="librarian">Librarian</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="passwordInput">Password</label><br />
                                    <input type="password" id="passwordInput" name="password" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/><br />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="confirmPasswordInput">Confirm Password</label><br />
                                    <input type="password" id="confirmPasswordInput" name="confirmPassword" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Confirm Password" onChange={(e) => setConfPassword(e.target.value)}/><br />
                                </div>
                                <div className="mt-6">
                                    <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer">Create Staff</button>
                                    <button type="reset" className="w-full py-2 border-1 border-gray-200 rounded-md mt-4 hover:bg-gray-200 hover:cursor-pointer" onClick={() => setIsAddStaffOpen(false)}>Cancel</button>
                                </div>
                            </form>
                        )}
                        <div className="flex gap-4 justify-between">
                            <div>
                                <h1 className="font-bold text-3xl">Staff Management</h1>
                                <p className="text-md">Manage library staff and administrators (Admin Only)</p>
                            </div>
                            <button className="flex gap-4 bg-black text-white px-4 py-2 self-center rounded-md hover:bg-gray-900 hover:cursor-pointer" onClick={() => setIsAddStaffOpen(true)}>
                                <FontAwesomeIcon icon={faAdd} className="self-center" />
                                Add Staff
                            </button>
                        </div>
                        <Search searchFor={'staffs'} placeHolder={'Search staff by username, email or role'} />
        </div>
    )
}
export default Staffs