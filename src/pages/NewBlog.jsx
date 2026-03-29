// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'


// const NewBlog = () => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: '<p>Hello World! 🌍</p>',
//     // Editörün içine DaisyUI "prose" sınıfını ekliyoruz ki başlıklar güzel görünsün
//     editorProps: {
//       attributes: {
//         class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px]',
//       },
//     },
//   })

//   if (!editor) {
//     return null
//   }

//   return (
//     <div className="border border-base-300 rounded-xl overflow-hidden bg-base-100">
//       {/* TOOLBAR (Araç Çubuğu) - Burada DaisyUI butonlarını kullanıyoruz */}
//       <div className="bg-base-200 p-2 flex gap-2 border-b border-base-300 flex-wrap">
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={`btn btn-sm ${editor.isActive('bold') ? 'btn-primary' : 'btn-ghost'}`}
//         >
//           Bold
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={`btn btn-sm ${editor.isActive('italic') ? 'btn-primary' : 'btn-ghost'}`}
//         >
//           Italic
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           className={`btn btn-sm ${editor.isActive('heading', { level: 2 }) ? 'btn-primary' : 'btn-ghost'}`}
//         >
//           H2
//         </button>
//         <button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={`btn btn-sm ${editor.isActive('bulletList') ? 'btn-primary' : 'btn-ghost'}`}
//         >
//           Bullet List
//         </button>
//       </div>

//       {/* ASIL EDİTÖR ALANI */}
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default NewBlog