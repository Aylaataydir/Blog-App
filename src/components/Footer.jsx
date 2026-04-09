
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="w-full bg-[#e3e3d6] border-t border-[#e0d8ce] py-7 flex flex-col items-center mt-20">
            <div className="flex flex-col items-center w-full gap-4">
                <div className="italic text-2xl md:text-3xl font-semibold text-[#7c6f57] text-center leading-snug tracking-wide font-playfair">
                    <span className="text-2xl md:text-3xl text-[#b8826a] align-middle select-none">“</span>
                    Your thoughts deserve to be heard.
                    <span className="text-2xl md:text-3xl text-[#b8826a] align-middle select-none">”</span>
                </div>
                <div className="text-base md:text-lg text-[#a58d6f] text-center font-normal max-w-md italic font-pinyon">
                    Write, share, and discover your community here.
                </div>
                <div className="flex gap-3 mt-1">
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
                <div className="text-xs font-inter text-[#b5b3ab] mt-4 tracking-wide text-center">
                    © {new Date().getFullYear()} Blogify. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer