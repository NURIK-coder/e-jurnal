import { useEffect, useState } from "react"
import { store } from "../store/store"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../store/admin/auth"
import logo from '../assets/logo.png'
import { useTranslation } from "react-i18next"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem("journal_token")
        if (token) {
            navigate('/dashboard')
        }
    }, [navigate])

    const handleLogin = async (e) => {
        if (e) e.preventDefault()
        setError("")
        setLoading(true)

        if (!username || !password) {
            setError("Iltimos, login va parolni to'ldiring.")
            return
        }

        const userData = { username, password }

        try {
            const result = await store.dispatch(userLogin(userData))
            console.log(result);
            

            if (result && result.access) {
                setLoading(false)
                navigate('/dashboard')
            }
        } catch (err) {
            const message =
                err?.non_field_errors?.[0] ||
                err?.detail ||
                "Login yoki serverda xatolik yuz berdi"
            setLoading(false)
            setError(message)
            
            console.log(message);
            
        }
    }

    return (
        <div className="xl:flex justify-around pt-10 min-w-screen min-h-screen dark:bg-[#1E2A38] flex-wrap ">
            <div className="flex xl:hidden items-center justify-center w-full h-64">
                <img src={logo} className="w-[200px] h-[200px]" />
            </div>

            <div className="flex-grow flex xl:items-center justify-center px-4 ">
                <div className="bg-white p-8 w-full max-w-md space-y-6 dark:bg-[#273947] rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="text-2xl dark:text-white font-bold text-gray-800">
                            {t('university_name')}
                        </h2>
                    </div>

                    {/* форма для submit по Enter */}
                    <form className="space-y-4 text-left" onSubmit={handleLogin}>
                        {error && (
                            <div className="text-red-600 text-sm font-medium bg-red-100 px-3 py-2 rounded dark:bg-[#273947]">
                                ❗ {error}
                            </div>
                        )}

                        <div>
                            <label className="dark:text-gray-300 block text-sm font-medium text-gray-700">
                                Login 
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Login"
                                className="mt-1 block w-full px-4 py-2 pr-10 border placeholder-gray-400 text-black dark:text-gray-200 dark:placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <label className="dark:text-gray-300 block text-sm font-medium text-gray-700">
                                Parol
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Parol"
                                className="mt-1 block w-full px-4 py-2 pr-10 border text-black dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-[38px] right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            {!loading 
                            ? t('log_in') 
                            : (
                                <div className="flex gap-2 justify-center p-2">
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                </div>           
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden xl:flex items-center justify-center w-1/2 mx-auto my-5">
                <img src={logo} className="w-[400px] h-[400px]" />
            </div>
        </div>
    )
}
