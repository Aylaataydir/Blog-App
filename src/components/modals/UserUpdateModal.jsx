
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema } from '../../lib/schemas';
import useBlogCall from '../../hooks/useBlogCall';
// import { calcGeneratorDuration } from 'framer-motion';



const UserUpdateModal = ({ currentUser }) => {
    console.log(currentUser)

    const { updateUserCredentials } = useBlogCall()

    const form = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            username: currentUser.username,
            email: currentUser.email,
            image: currentUser.image || "",
        },
    });


    const { register, handleSubmit, formState: { errors, isSubmitting } } = form


    const onSubmit = async (data) => {

        const updatedCredentials = {
            username: data.username,
            email: data.email,
            image: data.image || "",
        }
        const res = await updateUserCredentials(currentUser._id, updatedCredentials)

        if (res) {
            document.getElementById('my_modal_6').close()
        }

    }


    return (
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box  bg-bg-primary p-6  rounded-sm max-w-lg">
                <h3 className="font-semibold font-[Poppins] text-lg border-b border-bg-secondary/30 pb-3">Update Profile</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium opacity-60 uppercase tracking-wider">Username</label>
                        <input
                            {...register("username")}
                            className={`w-full px-3 py-2 text-sm rounded-sm border bg-white outline-none focus:border-bg-secondary transition-colors ${errors.username ? 'border-red-400' : 'border-bg-btn/40'}`}
                        />
                        {errors.username && <span className="text-red-400 text-xs">{errors.username.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium opacity-60 uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className={`w-full px-3 py-2 text-sm rounded-sm border bg-white outline-none focus:border-bg-secondary transition-colors ${errors.email ? 'border-red-400' : 'border-bg-btn/40'}`}
                        />
                        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium opacity-60 uppercase tracking-wider">Profile Image URL</label>
                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            {...register("image")}
                            className="w-full px-3 py-2 text-sm rounded-sm border border-bg-btn/40 bg-white outline-none focus:border-bg-secondary transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 justify-end pt-2 border-t border-bg-secondary/20">
                        <button
                            type="button"
                            onClick={() => document.getElementById('my_modal_6').close()}
                            className="px-4 py-2 text-xs font-medium rounded-sm bg-bg-btn-2 hover:opacity-80 transition-opacity"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="px-4 py-2 text-xs font-semibold text-white rounded-sm bg-bg-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop"><button /></form>
        </dialog>
    )
}

export default UserUpdateModal