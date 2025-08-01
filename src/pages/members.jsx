import { useContext, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faAdd, faSearch } from "@fortawesome/free-solid-svg-icons"
import { totalMembersContext } from "../App"
import MemberContainer from "../membercontainer"
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

function Members(){
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    const showOverlay = isAddMemberOpen

    async function submitHandler(e){
        e.preventDefault()

        const form = e.target
        const fullName = form.elements.fullname.value
        const emailAddress = form.elements.emailAddress.value
        const phoneNumber = form.elements.phoneNumber.value
        const joinDate = new Date().toISOString().split('T')[0]
        console.log(joinDate)
        console.log(fullName)
        console.log(emailAddress)
        console.log(phoneNumber)

        try{
            const response = await axiosInstance.post('/members', {
                                name: `${fullName}`,
                                email: `${emailAddress}`,
                                phone: `${phoneNumber}`,
                                join_date: `${joinDate}`
                            });
            if (response.request.status === 201){
                window.location.href = "/members"
            }
        }
        catch (error){
            alert("Couldn't perform the requested action")
            console.error("there was an error posting the data", error)
        }
    }

    return(
        <div className="p-4 px-5">
            {showOverlay && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                    onClick={() => {
                        setIsAddMemberOpen(false)
                    }}
                />
            )}
            {isAddMemberOpen && (
                            <form className="p-4 bg-white absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-lg m-auto z-50 rounded shadow-lg transition-all duration-300" onSubmit={submitHandler}>
                                <h1 className="text-center">Add New Member</h1>
                                <p className="text-center">Enter the details for the new member.</p>
                                <FontAwesomeIcon icon={faX} className="absolute right-6 top-6 hover:cursor-pointer hover:bg-black px-2 py-2 rounded-md hover:text-white" onClick={() => setIsAddMemberOpen(false)}/>
                                <div className="mt-6">
                                    <label htmlFor="fullNameInput">Full Name</label><br />
                                    <input type="text" id="fullNameInput" name="fullname" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter full name"/><br />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="emailAddressInput">Email Address</label><br />
                                    <input type="email" id="emailAddressInput" name="emailAddress" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter email address"/><br />
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="phoneNumberInput">Phone Number</label><br />
                                    <input type="tel" id="phoneNumberInput" name="phoneNumber" className="px-4 py-2 border-1 border-gray-300 w-full rounded-md focus:outline-2 focus:outline-black" required placeholder="Enter Phone Number"/>
                                </div>
                                <div className="mt-6">
                                    <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer">Create Member</button>
                                    <button type="reset" className="w-full py-2 border-1 border-gray-200 rounded-md mt-4 hover:bg-gray-200 hover:cursor-pointer" onClick={() => setIsAddMemberOpen(false)}>Cancel</button>
                                </div>
                            </form>
                        )}
                        <div className="flex gap-4 justify-between">
                            <div>
                                <h1 className="font-bold text-3xl">Members</h1>
                                <p className="text-md">Manage library members</p>
                            </div>
                            <button className="flex gap-4 bg-black text-white px-4 py-2 self-center rounded-md hover:bg-gray-900 hover:cursor-pointer" onClick={() => setIsAddMemberOpen(true)}>
                                <FontAwesomeIcon icon={faAdd} className="self-center" />
                                Add Member
                            </button>
                        </div>
                        < Search searchFor={'members'} placeHolder={'Search member by name, email or phone number'}/>
        </div>
    )
}
export default Members