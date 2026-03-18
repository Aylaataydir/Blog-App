
import { useTransition } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuthCall from '../hooks/useAuthCall'


const Navbar = () => {

    const { currentUser } = useSelector((state) => state.auth)
    const { isPending, startTransition } = useTransition()
    const { logOut } = useAuthCall()


    const handleLogOut = async () => {

        // startTransition(async() => await logOut())
        await logOut()

    }

    return (
        <div className="navbar justify-between  shadow-sm px-5 bg-bg-btn ">
            <div className="">
                <input type="text" placeholder="Search" className="bg-white border-0 py-1.5 px-3 text-xs w-40 rounded-2xl opacity-90 " />
            </div>
            <div className='flex gap-10'>
                <Link className='navLink' to="/">HOME</Link>
                <Link className='navLink' to="/contact">CONTACT</Link>
                <Link className='navLink' to="/about">ABOUT</Link>
            </div>
            <div className="flex gap-2 items-center">
                {currentUser &&
                    <div className=''>
                        <p>{currentUser.username}</p>
                    </div>}

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className=" flex  btn btn-ghost btn-circle avatar">


                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {currentUser
                            ? <li onClick={handleLogOut}><Link>{isPending ? "Loging out..." : "Log out"}</Link></li>
                            : <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar