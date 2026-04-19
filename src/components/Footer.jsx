
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <div >
            <footer className="w-full bg-[#c2c5aa] border-t border-[#e0d8ce] py-3 flex flex-col items-center ">
                <div className="flex justify-between ps-5 pe-10 items-center w-full gap-2">
                    <div className="text-xs font-inter text-gray-600 tracking-wide">
                        © {new Date().getFullYear()} Blogify. All rights reserved.
                    </div>
                 
                    <div className="flex gap-5 mt-1">
                        <a href="#" aria-label="Instagram" className="transition hover:bg-[#cb997e] bg-[#f2f1ea] rounded-full w-8 h-8 flex items-center justify-center border border-[#e0d8ce] group">
                            <FaInstagram className="text-[#b8826a] text-lg" />
                        </a>
                        <a href="#" aria-label="Twitter" className="transition hover:bg-[#cb997e] bg-[#f2f1ea] rounded-full w-8 h-8 flex items-center justify-center border border-[#e0d8ce] group">
                            <FaTwitter className="text-[#b8826a] text-lg" />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="transition hover:bg-[#cb997e] bg-[#f2f1ea] rounded-full w-8 h-8 flex items-center justify-center border border-[#e0d8ce] group">
                            <FaLinkedin className="text-[#b8826a] text-lg" />
                        </a>
                    </div>
                </div>
            </footer>



        </div>
    );
}

export default Footer