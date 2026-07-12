
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema } from '../../lib/schemas';
import useBlogCall from '../../hooks/useBlogCall';
import { useRef, useState } from 'react';
import { p } from 'framer-motion/client';
// import { calcGeneratorDuration } from 'framer-motion';



const UserUpdateModal = ({ currentUser, imagePreview, setImagePreview }) => {

    //clodinary states
    const [selectedFileName, setSelectedFileName] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPasswordFields, setShowPasswordFields] = useState(false)

    const fileInputRef = useRef()

    const { UploadCloudinary } = useBlogCall()

    const { updateUserCredentials } = useBlogCall()

    const form = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            username: currentUser.username,
            email: currentUser.email,
            avatar: currentUser.avatar || "",
        },
    });


    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = form


    const onSubmit = async (data) => {

        console.log(data)

        const updatedCredentials = {
            username: data.username,
            email: data.email,
            avatar: imagePreview || data.avatar || "",
        }

        const updatePassword = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
        }
        const res = await updateUserCredentials(currentUser._id, updatedCredentials)

        if (res) {
            document.getElementById('my_modal_6').close()
        }

    }

    const handleFileChange = async (e) => {

        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PROFILE_PRESET)
        setLoading(true)
        console.log(...formData.values())
        const data = await UploadCloudinary(formData)

        if (data?.secure_url) {
            setValue('avatar', data.secure_url, { shouldValidate: true })
            setImagePreview(data.secure_url);
            setSelectedFileName(file.name)
        }
        setLoading(false)
    }


    const deleteUploadedImage = () => {
        setValue("avatar", "")
        setImagePreview("")
        setSelectedFileName("")

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }


    return (
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-bg-primary p-0 rounded-lg max-w-lg ">
                <div className="px-6 pt-5 pb-3 border-b border-bg-btn-2">
                    <h3 className="font-semibold font-[Poppins] text-base text-gray-800">Update Profile</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Edit your account details below</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 py-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium font-[Poppins] text-gray-500 tracking-wider">Username</label>
                        <input
                            {...register("username")}
                            className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white outline-none focus:border-bg-secondary focus:shadow-[0_0_0_3px_rgba(203,153,126,0.12)] transition-all ${errors.username ? 'border-red-400' : 'border-bg-btn-2'}`}
                        />
                        {errors.username && <span className="text-red-400 text-xs">{errors.username.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium font-[Poppins] text-gray-500 tracking-wider">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white outline-none focus:border-bg-secondary focus:shadow-[0_0_0_3px_rgba(203,153,126,0.12)] transition-all ${errors.email ? 'border-red-400' : 'border-bg-btn-2'}`}
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium font-[Poppins] text-gray-500 tracking-wider">Profile Image</label>
                        <input
                            type="url"
                            disabled={true}
                            placeholder="https://example.com/image.jpg"
                            {...register("avatar")}
                            className="w-full px-3 py-2.5 text-sm rounded-md border border-bg-btn-2 bg-white outline-none focus:border-bg-secondary focus:shadow-[0_0_0_3px_rgba(203,153,126,0.12)] transition-all placeholder:text-gray-300"
                        />
                        <div>
                            <button
                                type='button'
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                className="px-2 py-1.5 w-25 me-3 bg-gray-100 border border-gray-300 rounded-md cursor-pointer font-medium hover:bg-gray-200 transition"
                            >Upload File</button>
                            {loading
                                ? <span className="animate-pulse text-bg-secondary text-xs">Loading...</span>
                                : selectedFileName
                                    ?
                                    <>
                                        {`Selected: ${selectedFileName}`}
                                        <button onClick={deleteUploadedImage} type="button" className="remove-file-btn ml-2 text-red-600 text-base cursor-pointer">×</button>
                                    </>
                                    : imagePreview || currentUser.avatar ?
                                        <>
                                            <span className="text-xs text-gray-500">Upload Profile Image</span>

                                        </>
                                        : 'Choose a file'}
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* password change 

                    <div className="pt-3 border-t border-bg-btn-2">
                        <button
                            type="button"
                            onClick={() => setShowPasswordFields(prev => !prev)}
                            className="text-xs font-medium font-[Poppins] text-bg-secondary hover:underline cursor-pointer flex items-center gap-1"
                        >
                            {showPasswordFields ? "− Cancel password change" : "+ Change Password"}
                        </button>
                    </div>

                    {showPasswordFields && (
                        <div className="flex flex-col gap-4 pt-1">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium font-[Poppins] text-gray-500 tracking-wider">Current Password</label>
                                <input
                                    type="password"
                                    {...register("currentPassword")}
                                    className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white outline-none focus:border-bg-secondary focus:shadow-[0_0_0_3px_rgba(203,153,126,0.12)] transition-all ${errors.currentPassword ? 'border-red-400' : 'border-bg-btn-2'}`}
                                />
                                {errors.currentPassword && <span className="text-red-400 text-xs">{errors.currentPassword.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium font-[Poppins] text-gray-500 tracking-wider">New Password</label>
                                <input
                                    type="password"
                                    {...register("newPassword")}
                                    className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white outline-none focus:border-bg-secondary focus:shadow-[0_0_0_3px_rgba(203,153,126,0.12)] transition-all ${errors.newPassword ? 'border-red-400' : 'border-bg-btn-2'}`}
                                />
                                {errors.newPassword && <span className="text-red-400 text-xs">{errors.newPassword.message}</span>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium font-[Poppins] text-gray-500 tracking-wider">Confirm Password</label>
                                <input
                                    type="password"
                                    {...register("confirmPassword")}
                                    className={`w-full px-3 py-2.5 text-sm rounded-md border bg-white outline-none focus:border-bg-secondary focus:shadow-[0_0_0_3px_rgba(203,153,126,0.12)] transition-all ${errors.confirmPassword ? 'border-red-400' : 'border-bg-btn-2'}`}
                                />
                                {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword.message}</span>}
                            </div>
                        </div>
                    )}
 */}

                    <div className="flex items-center gap-2 justify-end pt-3 border-t border-bg-btn-2">
                        <button
                            type="button"
                            onClick={() => {
                                document.getElementById('my_modal_6').close()
                                deleteUploadedImage()
                            }}
                            className="px-4 py-2 text-xs font-medium font-[Poppins] rounded-md border border-bg-btn-2 text-gray-600 hover:bg-bg-btn-2/50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button

                            disabled={isSubmitting}
                            type="submit"
                            className="px-5 py-2 text-xs font-semibold font-[Poppins] text-white rounded-md bg-bg-secondary hover:bg-[#b8826a] shadow-[0_2px_8px_rgba(203,153,126,0.25)] transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div >
            <form method="dialog" className="modal-backdrop"><button /></form>
        </dialog >
    )
}

export default UserUpdateModal