import React from 'react'
import { Link, useRouteError } from "react-router-dom";

const Error = () => {

    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-bg-body">
            <h1 className="text-3xl font-semibold text-gray-800" style={{ fontFamily: 'var(--font-poppins)' }}>Oops!</h1>
            <p className="text-sm text-gray-500 mt-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-xs text-gray-400 mt-1 italic">
                {error?.statusText || error?.message}
            </p>
            <Link to="/home" className="nav-login-btn mt-6 inline-block">Home'a dön</Link>
        </div>
    )
}

export default Error