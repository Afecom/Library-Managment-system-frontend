import bookImage from './assets/bookimage.png'
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

const axiosInstance = axios.create({
    baseURL: 'https://library-managment-system-api.onrender.com'
})

function Login(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token){
            setIsLoggedIn(true);
        }
        setIsLoading(false)
    }, [])

    async function submitHandler(e) {
        e.preventDefault();

        const forms = e.target;
        const credentials = {
            username: forms.elements.username.value,
            password: forms .elements.password.value,
        }

        try{
            const response = await axiosInstance.post('/auth/login', {
                email: `${credentials.username}`,
                password: `${credentials.password}`
            })

             if (response.request.status === 201){
                localStorage.setItem('token', response.data.access_token)
                window.location.href = "/dashboard";
                setIsLoggedIn(true)
            }
            console.log(response.request.status)
        }
        catch (error){
            alert("Invalid Credentials")
            console.error("there was and error logging the user in", error)
        }
    }

        return(
            <div>
            <main className='border-cyan-600 border-2 w-full h-[100dvh] flex justify-center items-center bg-gray-100'>
                <form className='bg-white rounded-lg py-4 px-6 flex-col w-[90%] m-auto max-w-xl' onSubmit={submitHandler}>
                    <img src={bookImage} alt="" className='w-22 h-auto m-auto'/>
                    <h1 className='text-center text-3xl lg:text-4xl font-bold my-4 mx-0'>Library Manager System</h1>
                    <p className='text-center text-xl mb-6 text-gray-500'>Sign in to your account to continue</p>
                    <div className='mb-6'>
                        <label htmlFor="usernameField" className='text-lg font-bold'>User Email</label><br />
                        <input type="text" name="username" id="usernameField" placeholder='Enter your username' className='border-gray-300 border-1 rounded-md py-2 px-2 w-full mt-2 focus:outline-black focus:outline-2' required /><br />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="passwordField" className='text-lg font-bold'>Password</label><br />
                        <input type="password" name="password" id="passwordField" placeholder='Enter your password'className='border-gray-300 border-1 rounded-md py-2 px-2 w-full mt-2 focus:outline-black focus:outline-2' required /><br />
                    </div>
                    <button type="submit" className='bg-black rounded-md text-white text-xl w-full py-2 mb-2 hover:cursor-pointer hover:bg-gray-800'>Sign in</button>
                    <div className='flex justify-between mt-4'>
                        <p>Administrator email: husnia43@gmail.com</p>
                        <p>Password: Husnia@4231</p>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <p>Librarian email: aymenanwar45@gmail.com</p>
                        <p>Password: Aymen@4231</p>
                    </div>
                </form>
            </main>
        </div>
        )
    
}
export default Login