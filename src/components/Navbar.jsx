
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import useAuthCall from '../hooks/useAuthCall'
import useBlogCall from '../hooks/useBlogCall'
import { toggleSearching } from '../features/blogSlice'
import { MdVerticalAlignBottom } from 'react-icons/md'
import logo from "../../assets/logo.png"


const Navbar = () => {

    const { currentUser } = useSelector((state) => state.auth)
    const { blogs } = useSelector((state) => state.blog)
    const [isPending, setIsPending] = useState(false)
    const { logOut } = useAuthCall()
    const { getDataByEndpoint } = useBlogCall()
    const dispatch = useDispatch()

    const timerRef = useRef(null) // inputa her tiklamada databaseden veri cekmesin diye kullaniyorum.

    const handleLogOut = async (e) => {
        e.preventDefault()
        setIsPending(true)
        await logOut()
        setIsPending(false)
    }

    const handleSearch = (query) => {

        clearTimeout(timerRef.current)
        dispatch(toggleSearching(true))

        timerRef.current = setTimeout(async () => {

            if (query.trim()) {

                const veri = await getDataByEndpoint("blogs", {
                    "search[title]": query.trim(),
                    "search[content]": query.trim(),
                }, "blogs")
                console.log(veri.data)
            } else {
                dispatch(toggleSearching(false))
            }
        }, 500)

        console.log(blogs)

    }

    return (
        <div className="navbar justify-between shadow-sm px-5 bg-bg-btn">
            <div className="flex">
                {/* <img src={logo} alt="logo" width={60} /> */}
                <input onChange={(e) => handleSearch(e.target.value)} type="text" spellCheck={false} placeholder="Search" className="bg-white border-0 py-1.5 px-3 text-xs w-40 rounded-2xl opacity-90 self-center " />
            </div>
            <div className='flex gap-10'>
                <NavLink className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink'} to="/home">HOME</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink'} to="/contact">CONTACT</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink'} to="/about">ABOUT</NavLink>
            </div>
            <div className="flex gap-2 items-center">
                {currentUser &&
                    <div className='text-base'>
                        <p>{currentUser.username}</p>
                    </div>}

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className=" flex w-11 btn btn-ghost btn-circle avatar">


                        <div className=" rounded-full">
                            <img src={currentUser?.image ? currentUser.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu text-center menu-sm dropdown-content bg-bg-body rounded-box z-1 mt-1 w-42 p-2 shadow">
                        {currentUser
                            ? <>
                                <li><Link to="my-profile/my-blogs" className='py-2 font-semibold  text-gray-700/80 text-sm hover:bg-bg-primary'>My Profile</Link></li>
                                <li><Link className='py-2 font-semibold  text-gray-700/80 text-sm hover:bg-bg-primary' onClick={handleLogOut}>{isPending ? "Loging out..." : "Log out"}</Link></li>
                            </>
                            : <>
                                <li><Link className='py-2 font-semibold  text-gray-700/80 text-sm hover:bg-bg-primary' to="/login">Login</Link></li>
                                <li><Link className='py-2 font-semibold  text-gray-700/80 text-sm hover:bg-bg-primary' to="/register">Register</Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar