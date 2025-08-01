import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

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

function EditGenre(props){
    const genreId = props.id
    async function submitHandler(e){
        e.preventDefault()
        const form = e.target
        const title = form.elements.genreInput.value
        
        try{
            const response = await axiosInstance.patch(`/genres/${genreId}`, {
                name: `${title}`
            })
            if (response.request.status === 200){
                window.location.href = "/genres"
            }
        }
        catch(error){
            alert("Couldn't perform the requested action")
            console.error("Couldn't update the genre", error)
        }
    }

    return(
        <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50 bg-white shadow-3xl shadow-gray-300 rounded-md">
            <h1 className="text-center font-bold text-xl">Edit Genre</h1>
            <p className="text-center text-gray-400">Update the genre name below</p>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-2xl hover:cursor-pointer" onClick={props.onCloseModal}/>
            <form onSubmit={submitHandler}>
                <div className="mt-4">
                    <label htmlFor="genreInput">Genre Name</label><br />
                    <input required type="text" id="genreInput" name="genre" className="p-2 focus:outline-2 focus:outline-black w-full border-1 border-gray-300 mt-3 rounded-md" defaultValue={props.name}/>
                </div>
                <div className="mt-4">
                    <button type="submit" className="w-full py-2 bg-black text-white rounded-md mb-4 hover:bg-gray-800 hover: cursor-pointer">Update Genre</button>
                    <button type="reset" className="w-full py-2 rounded-md mb-4 border-1 border-gray-300 hover:bg-gray-300 hover: cursor-pointer" onClick={props.onCloseModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default EditGenre