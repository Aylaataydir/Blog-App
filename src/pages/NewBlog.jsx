import { useState, useEffect } from 'react'
import TiptapEditor from '../components/textEditor/TipTapEditor'
import { LuX, LuEye } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogSchema } from '../lib/schemas'
import { useSelector } from 'react-redux'
import useBlogCall from '../hooks/useBlogCall'
import { useNavigate } from 'react-router-dom'

const NewBlog = () => {

  const navigate = useNavigate()

  const [showPreview, setShowPreview] = useState(false)
  const { categories } = useSelector(state => state.blog)
  const { getDataByEndpoint, addBlog } = useBlogCall()
  const [previewData, setPreviewData] = useState({ title: '', content: '', image: '' })

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      categoryId: '',
      title: '',
      content: '',
      image: '',
      isPublish: true

    },
  })


  const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = form

  const onSubmit = async (data) => {
    console.log('Gönderilecek veri:', data)
    console.log(data)
    const res = await addBlog(data)
    if (res) navigate("/home")

  }

  useEffect(() => {
    if (!categories) getDataByEndpoint('categories')
  }, [])

  return (
    <div className="newblog-page">
      <div className="newblog-container">
        {/* Page Header */}
        <div className="newblog-header">
          <h1 className="newblog-title">Create New Post</h1>
          <p className="newblog-subtitle">Share your thoughts with the world</p>
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
            <TiptapEditor onChange={(html) => setValue('content', html, { shouldValidate: true })} />
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
                setPreviewData(getValues())
                setShowPreview(true)
              }}
            >
              <LuEye size={16} />
              Preview
            </button>
            <button type="submit" disabled={isSubmitting} className="newblog-publish-btn">
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <span className="preview-modal-badge">Preview</span>
              <button
                className="preview-modal-close"
                onClick={() => setShowPreview(false)}
              >
                <LuX size={20} />
              </button>
            </div>

            <div className="preview-modal-body">
              {previewData.image && (
                <img
                  src={previewData.image}
                  alt="Cover"
                  className="preview-cover"
                />
              )}
              <h1 className="preview-title">
                {previewData.title || 'Untitled Post'}
              </h1>
              <div
                className="preview-content tiptap"
                dangerouslySetInnerHTML={{ __html: previewData.content || '<p style="color:#aaa">No content yet...</p>' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewBlog