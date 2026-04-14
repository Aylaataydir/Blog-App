import { useState, useEffect } from 'react'
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

const NewBlog = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { categories, editingBlog } = useSelector(state => state.blog)
  const { getDataByEndpoint, addBlog, updateBlog } = useBlogCall()
  const [previewData, setPreviewData] = useState({ title: '', content: '', image: '' })

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
            <label className="newblog-label">Cover Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register('image')}
              className={`newblog-input ${errors.image ? 'newblog-input--error' : ''}`}
            />
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