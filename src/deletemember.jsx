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

function DeleteMember(props){

    async function clickHandler(){
        const memberId = props.id

        try{
            const response = await axiosInstance.delete(`/members/${memberId}`)
            if (response.request.status === 200){
                window.location.href = "/members"
            }
        }
        catch(error){
          console.error("Couldn't delete the staff member", error)
          alert("Couldn't perform the requested action")
        }
    }

    return(
    <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white shadow-3xl shadow-gray-300 rounded-xl">
        <h1 className='text-center text-2xl font-bold'>Delete Member</h1>
        <p className="text-center mt-2">Are you sure you want to delete "{props.fullName}"? This
            action cannot be undone
        </p>
        <button type="button" className="w-full bg-red-600 text-white rounded-md hover:cursor-pointer hover:bg-red-400 py-2 my-4" onClick={clickHandler}>Delete</button>
        <button type="button" className="w-full rounded-md hover:cursor-pointer hover:bg-gray-200 border-2 border-gray-200 py-2" onClick={props.onCloseModal}>Cancel</button>
    </div>
    ) 
}
export default DeleteMember