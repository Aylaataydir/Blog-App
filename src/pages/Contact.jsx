

import contact from "../../assets/about5.jpg";

const Contact = () => {
    return (
        <div className="min-h-screen w-full flex flex-col  bg-bg-primary px-3">
            
            //! TITEL

            <div className=" flex flex-col w-full mt-10 md:mt-20 lg:mt-18 lg:mb-8  items-center justify-center ">
                <div className="font-poppins text-center md:max-w-xl lg:max-w-3xl">
                    <h1 className="text-xl md:text-3xl font-bold font-[Poppins] mb-5 text-gray-800 tracking-tight">Contact Us</h1>
                    <p className="text-md md:text-base text-gray-800 "> Every great story starts with a simple hello. Whether you have a question, a suggestion, or just want to share a thought, we’re all ears. This digital library grows with your voice.</p>
                    <p className="text-md md:text-base text-gray-800 "> Drop us a message and let’s start a conversation!</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 lg:gap-5 items-center mb-16 md:mb-0 px-3 pt-12  lg:pb-28 w-full max-w-6xl mx-auto ">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <img
                        src={contact}
                        alt="Contact Visual"
                        className="flex rounded-lg  object-cover w-full max-w-md h-66 md:h-96  mb-6 md:mb-0"
                    />
                </div>
                
                //! FORM

                <form className="w-full md:w-1/2 max-w-lg px-2 flex flex-col gap-8 ">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-1/2 bg-transparent border-0 border-b-2 border-bg-secondary focus:border-bg-btn-2 outline-none py-2 px-1 text-gray-700 placeholder:text-gray-400 transition-all"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            className="w-1/2 bg-transparent border-0 border-b-2 border-bg-secondary focus:border-bg-btn-2 outline-none py-2 px-1 text-gray-700 placeholder:text-gray-400 transition-all"
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-transparent border-0 border-b-2 border-bg-secondary focus:border-bg-btn-2 outline-none py-2 px-1 text-gray-700 placeholder:text-gray-400 transition-all"
                    />
                    <textarea
                        placeholder="Message"
                        rows={5}
                        className="w-full bg-transparent border-0 border-b-2 border-bg-secondary focus:border-bg-btn-2 outline-none py-2 px-1 text-gray-700 placeholder:text-gray-400 transition-all resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full mt-6 py-2 rounded-md bg-bg-secondary text-white font-semibold text-base tracking-wide shadow hover:bg-bg-btn-2 transition-all cursor-pointer"
                    >
                        Send Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact