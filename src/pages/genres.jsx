import { faAdd, faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GenresContainer from "../genrescontainer"
import { genresContext } from "../App"
import axios from "axios"
import { useContext, useState, createContext } from "react"
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

function Genres(){
    const [isAddGenreOpen, setisAddGenreOpen] = useState(null)
    const [activeModal, setActiveModal] = useState({ type: null, genreId: null })
    const genres = useContext(genresContext)?.data ?? []

    async function addGenreHandler(){
        const genreName = document.getElementById("genreInput").value

        try{
            const response = await axiosInstance.post('/genres', {
                name: `${genreName}`,
            })
            console.log(response)
            if (response.request.status === 201){
                window.location.href = "/genres"
            }
        }
        catch(error){
            alert("Couldn't perform the requested action")
            console.error("Couldn't create a genre", error)
        }
    }

    const showOverlay = !!activeModal.type || isAddGenreOpen

    return(
        <div className="p-4">
            {showOverlay && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 transition-opacity duration-300"
                    onClick={() => {
                        setActiveModal({ type: null, genreId: null })
                        setisAddGenreOpen(false)
                    }}
                />
            )}
            {isAddGenreOpen && (<div className="p-4 bg-white absolute top-1/2 md:top-60 left-1/2 -translate-x-1/2 w-full max-w-lg m-auto z-50 rounded shadow-lg transition-all duration-300">
                <h1 className="text-center font-bold text-2xl">Add New Genre</h1>
                <p className="text-center text-gray-400 mb-10">Enter the name for the new genre</p>
                <FontAwesomeIcon icon={faXmarkCircle} className="absolute top-4 right-8 text-xl hover:cursor-pointer" onClick={() => setisAddGenreOpen(false)}/>
                <div className="flex flex-col">
                    <label htmlFor="genreInput" className="font-bold text-xl">Genre Name</label><br />
                    <input type="text" name="genre" id="genreInput" className="px-4 py-2 rounded-md border-1 border-gray-500 focus:outline-2 focus:outline-black w-full" placeholder="Enter genre name" required/>
                </div>
                <div className="my-4 mt-6 flex flex-col gap-2">
                    <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer" onClick={addGenreHandler}>Create Genre</button>
                    <button className="w-full py-2 rounded-md hover:bg-gray-300 hover:cursor-pointer border-1 border-gray-500" onClick={() => setisAddGenreOpen(false)}>Cancel</button>
                </div>
            </div>)}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="font-bold text-4xl">Genres</h1>
                    <p className="text-xl mt-2 text-gray-600">Manage book genres (Admin Only)</p>
                </div>
                <button className="flex items-center gap-3 py-3 px-5 h-14 rounded-md bg-black 
                                text-white hover:cursor-pointer hover:bg-gray-800 text-nowrap" onClick={() => setisAddGenreOpen(true)}>
                    <FontAwesomeIcon icon={faAdd} />
                    Add Genre
                </button>
            </div>
            <Search searchFor={'genres'} placeHolder={'Search genres'}/>
        </div>
    )
}
export default Genres