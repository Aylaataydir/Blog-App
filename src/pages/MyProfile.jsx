
import MyProfileSidebar from '../components/MyProfile/MyProfileSidebar'
import { Outlet } from 'react-router-dom'

const MyProfile = () => {

    return (
        <div className="max-w-300 mx-auto  px-3 md:px-8 pt-4 pb-16  md:py-16">
            <div className="grid grid-cols-1  md:grid-cols-7 gap-6  lg:gap-11">
                <div className="md:col-span-2 mb-6 md:mb-0">
                    <MyProfileSidebar />
                </div>
                <div className="md:col-span-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MyProfile