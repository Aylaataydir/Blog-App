import React from 'react'
import { LuX } from 'react-icons/lu'

const BlogPreviewModal = ({ previewData }) => {
  return (
    <dialog id="blog-preview" className="modal modal-bottom sm:modal-middle">
      <div className="preview-overlay " >
        <div className="preview-modal" >
          <div className="preview-modal-header">
            <span className="preview-modal-badge">Preview</span>
            <form method="dialog">
              <button
                className="preview-modal-close"
              >
                <LuX size={20} />
              </button>
            </form>

          </div>

          <div className="preview-modal-body">
            <h1 className="preview-title">
              {previewData.title || 'Untitled Post'}
            </h1>
            {previewData.image && (
              <img
                src={previewData.image}
                alt="Cover"
                className="preview-cover"
              />
            )}

            <div
              className="preview-content tiptap"
              dangerouslySetInnerHTML={{ __html: previewData.content || '<p style="color:#aaa">No content yet...</p>' }}
            />
          </div>
        </div>
      </div>


    </dialog>
  )
}

export default BlogPreviewModal