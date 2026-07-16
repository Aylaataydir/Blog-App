
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useAuthCall from '../hooks/useAuthCall'
import useBlogCall from '../hooks/useBlogCall'
import { clearSearch, toggleSearching } from '../features/blogSlice'
import { MdVerticalAlignBottom, MdArrowBack, MdMenu } from 'react-icons/md'



const Navbar = () => {

    const { currentUser } = useSelector((state) => state.auth)
    const { searchedItems } = useSelector((state) => state.blog)
    const [isPending, setIsPending] = useState(false)
    const { logOut } = useAuthCall()
    const { getDataByEndpoint } = useBlogCall()
    const dispatch = useDispatch()

    const location = useLocation()
    const isHomePage = location.pathname === '/home'
    const authPaths = ['/login', '/register']
    const isAuthPage = authPaths.includes(location.pathname)

    const timerRef = useRef(null) // inputa her tiklamada databaseden veri cekmesin diye kullaniyorum. komponent render olunca sifirlanmasin diye.
    // useRef in bir amaci da enderlar arasinda veri saklamak. eger direk timerref = null deseydim her renderda sifirlanicaki. bir ise yaramiycakti. usestate kullanmadim cünkü usestate kullansaydim timer id si her degistiginde component gereksiz renderlanicakti, cünkü ui da bir degisiklik yapmiyoruz. renderlanmadan sadece benim degerimi tutmasini istedigim icin useref kullandim.

    const handleLogOut = async (e) => {
        e.preventDefault()
        setIsPending(true)
        await logOut()
        setIsPending(false)
    }

    const closeDropdown = () => {
        document.activeElement.blur()
    }

    const handleSearch = (query) => {

        clearTimeout(timerRef.current)

        timerRef.current = setTimeout(async () => {  // timeRef.current = dedikten sonra settimeout hemen calismasa bile timerref e id atiyor. zaman dolunca bu id fonksiyonu calisiyor.

            if (query.trim()) {
                const data = await getDataByEndpoint("blogs", {
                    "search[content]": query.trim()
                }, "searchedItems")
                console.log(data.data)
            } else {
                dispatch(clearSearch())
            }

        }, 500)


    }

    return (
        <div className="navbar justify-between shadow-sm px-5 bg-bg-btn">
            {/* search  */}
            <div className={`flex ${isHomePage ? '' : 'invisible'}`}>
                <input
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    spellCheck={false}
                    placeholder="Search"
                    className="bg-white border-0 py-1.5 px-3 text-xs w-40 rounded-2xl opacity-90 self-center"
                />
            </div>
            <div className='hidden md:flex gap-10'>
                <NavLink onClick={closeDropdown} className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink'} to="/home">HOME</NavLink>
                <NavLink onClick={closeDropdown} className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink'} to="/about">ABOUT</NavLink>
                <NavLink onClick={closeDropdown} className={({ isActive }) => isActive ? 'navLink navLink--active' : 'navLink'} to="/contact">CONTACT</NavLink>
            </div>
            <div className="flex gap-2 items-center">
                {currentUser
                    ?
                    <div className='text-base'>
                        <p>{currentUser.username}</p>
                    </div>
                    : isAuthPage
                        ? <Link
                            to="/home"
                            onClick={closeDropdown}
                            className="nav-login-btn me-2 flex items-center gap-1"
                        >
                            <MdArrowBack /> Home
                        </Link>
                        : <Link
                            to="/login"
                            className="nav-login-btn me-2"
                        >
                            Login
                        </Link>}
                <div className="dropdown dropdown-end md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <MdMenu size={22} className="text-white" />
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu text-center z-50 menu-sm dropdown-content bg-bg-body rounded-box mt-1 w-40 p-2 shadow">
                        <li><NavLink onClick={closeDropdown} className={({ isActive }) => `py-3 font-semibold text-sm hover:bg-bg-primary ${isActive ? 'text-bg-secondary font-bold' : 'text-gray-700/80'}`} to="/home">Home</NavLink></li>
                        <li><NavLink onClick={closeDropdown} className={({ isActive }) => `py-3 font-semibold text-sm hover:bg-bg-primary ${isActive ? 'text-bg-secondary font-bold' : 'text-gray-700/80'}`} to="/about">About</NavLink></li>
                        <li><NavLink onClick={closeDropdown} className={({ isActive }) => `py-3 font-semibold text-sm hover:bg-bg-primary ${isActive ? 'text-bg-secondary font-bold' : 'text-gray-700/80'}`} to="/contact">Contact</NavLink></li>
                    </ul>
                </div>

                {currentUser &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className=" flex w-11 btn btn-ghost btn-circle avatar">


                            <div className=" rounded-full">
                                <img className="w-full h-full object-cover object-center" src={currentUser?.avatar ? currentUser.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu text-center z-50 menu-sm dropdown-content bg-bg-body rounded-box  mt-1 w-45 md:w-42 p-2 shadow">
                            <li><NavLink onClick={closeDropdown} to="my-profile/my-blogs" className='py-2 font-semibold  text-gray-700/80 text-sm hover:bg-bg-primary'>My Profile</NavLink></li>
                            <li><NavLink onClick={closeDropdown} className='py-2 font-semibold  text-gray-700/80 text-sm hover:bg-bg-primary' onClick={handleLogOut}>{isPending ? "Loging out..." : "Log out"}</NavLink></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar