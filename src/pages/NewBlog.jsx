import { useState, useEffect, useRef } from 'react'
// Cloudinary upload fonksiyonu için ekleme

import TiptapEditor from '../components/textEditor/TipTapEditor'
import { LuEye } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogSchema } from '../lib/schemas'
import { useDispatch, useSelector } from 'react-redux'
import useBlogCall from '../hooks/useBlogCall'
import { useNavigate } from 'react-router-dom'
import { setEditingBlog } from '../features/blogSlice'
import BlogPreviewModal from '../components/modals/BlogPreviewModal'
import { p } from 'framer-motion/client'

const NewBlog = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { categories, editingBlog } = useSelector(state => state.blog)
  const { getDataByEndpoint, addBlog, updateBlog, UploadCloudinary } = useBlogCall()
  const [previewData, setPreviewData] = useState({ title: '', content: '', image: '' })

  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(); // useRef, React’te hem DOM’a erişmek hem de render’dan bağımsız veri saklamak için kullanılır.State gibi render tetiklemez, ama değerini kaybetmez.

  console.log(editingBlog)

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      categoryId: editingBlog?.categoryId || "",
      title: editingBlog?.title || "",
      content: editingBlog?.content || "",
      image: editingBlog?.image || "",
      isPublish: true

    },
  })

  const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = form

  //! Cloudinary

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFileName(file.name);
    setImagePreview("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_BLOG_PRESET);

    const data = await UploadCloudinary(formData)

    if (data?.secure_url) {
      setValue('image', data.secure_url, { shouldValidate: true });
      setImagePreview(data.secure_url);
    }
    setUploading(false);

  };


  const deleteUploadedImage = () => {
    setImagePreview("")
    setSelectedFileName("")
    setValue('image', '')
  }



  const onSubmit = async (data) => {

    if (editingBlog) {

      console.log(data)
      const res = await updateBlog(editingBlog._id, data)
      if (res) {
        navigate("/my-profile/my-blogs")
        dispatch(setEditingBlog(null))
      }
    }

    else {
      console.log(data)
      const res = await addBlog(data)
      if (res) navigate("/home")
    }
  }

  useEffect(() => {
    if (!categories) getDataByEndpoint('categories')
  }, [])




  return (
    <div className="newblog-page">
      <div className="newblog-container">
        {/* Page Header */}
        <div className="newblog-header">
          <h1 className="newblog-title">{editingBlog ? "Edit Blog" : "Create New Post"}</h1>
          {!editingBlog &&
            <p className="newblog-subtitle">Share your thoughts with the world</p>
          }
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="newblog-form">

          {/* Category */}
          <div className="newblog-field">
            <label className="newblog-label">Category</label>
            <select
              {...register('categoryId')}
              className={`newblog-select ${errors.categoryId ? 'newblog-input--error' : ''}`}
            >
              <option value="">Select a category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="newblog-error">{errors.categoryId.message}</span>
            )}
          </div>

          {/* Title */}
          <div className="newblog-field">
            <label className="newblog-label">Title</label>
            <input
              type="text"
              placeholder="Blog title..."
              {...register('title')}
              className={`newblog-input ${errors.title ? 'newblog-input--error' : ''}`}
            />
            {errors.title && (
              <span className="newblog-error">{errors.title.message}</span>
            )}
          </div>

          {/* Cover Image URL */}
          <div className="newblog-field">
            <label className="newblog-label">Cover Image</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register('image')}
              className={`newblog-input ${errors.image ? 'newblog-input--error' : ''} mb-2`}
            />
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                className="px-4 py-1.5 bg-gray-100 border border-gray-300 rounded-md cursor-pointer font-medium hover:bg-gray-200 transition"
                onClick={() => fileInputRef.current && fileInputRef.current.click()} // current: fileInputRef.current, referansın işaret ettiği gerçek DOM elementini (yani input'u) temsil eder. click(): input elementinin click() fonksiyonu, dosya seçme penceresini açar.
              >
                Upload File
              </button>
              <input
                type="file"
                accept="image/*" // sadece img dosyalarini getirir doasyalar acilinca. örneğin .jpg, .png, .gif
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="text-gray-600 text-sm min-w-30 flex items-center">
                {uploading
                  ? <span className="animate-pulse text-bg-secondary text-xs">Loading...</span>
                  : selectedFileName
                    ? <>
                      {`Selected: ${selectedFileName}`}
                      <button onClick={deleteUploadedImage} type="button" className="remove-file-btn ml-2 text-red-700 text-base cursor-pointer">×</button>
                    </>
                    : <p className='opacity-50 text-xs'>Choose a file or enter a URL</p>}
              </span>
            </div>
            {imagePreview && (
              <div className="mb-2">
                <img src={imagePreview} alt="Önizleme" className="max-w-15 max-h-30 rounded-md border border-gray-200 shadow-sm" />
              </div>
            )}
            {errors.image && (
              <span className="newblog-error">{errors.image.message}</span>
            )}

          </div>

          {/* Content */}
          <div className="newblog-field">
            <label className="newblog-label">Content</label>
            <TiptapEditor initialContent={editingBlog?.content || ""} onChange={(html) => setValue('content', html, { shouldValidate: true })} />
            {errors.content && (
              <span className="newblog-error">{errors.content.message}</span>
            )}
          </div>

          {/* Actions */}
          <div className="newblog-actions">
            <button
              type="button"
              className="newblog-preview-btn"
              onClick={() => {
                setPreviewData(getValues());
                document.getElementById('blog-preview').showModal()
              }}
            >
              <LuEye size={16} />
              Preview
            </button>
            <button type="submit" disabled={isSubmitting} className="newblog-publish-btn">
              {editingBlog
                ? isSubmitting ? 'Updating...' : 'Update Blog'
                : isSubmitting ? 'Publishing...' : 'Publish Post'
              }
            </button>
          </div>
        </form>
      </div>

      <BlogPreviewModal previewData={previewData} />

    </div>
  )
}

export default NewBlog