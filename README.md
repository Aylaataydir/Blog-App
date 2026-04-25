# Proje File Structure

```
Blog-App/
├── eslint.config.js         
├── index.html               
├── package.json             
├── README.md                
├── vite.config.js          
├── assets/                  
├── public/                 
└── src/                     
    ├── App.css              
    ├── App.jsx              
    ├── main.jsx             
    ├── app/
    │   ├── router.jsx          
    │   ├── ScrollToTop.jsx      
    │   └── Store.js             
    ├── components/              
    │   ├── BlogCard.jsx
    │   ├── BlogList.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── MostRead.jsx
    │   ├── Navbar.jsx
    │   ├── SmallBlogCard.jsx
    │   ├── modals/             
    │   │   ├── BlogPreviewModal.jsx
    │   │   ├── DeleteModal.jsx
    │   │   └── UserUpdateModal.jsx
    │   ├── myProfile/           
    │   │   ├── MyBlogsList.jsx
    │   │   ├── MyFavoritesList.jsx
    │   │   ├── MyProfileSidebar.jsx
    │   │   └── MyReadingList.jsx
    │   ├── sidebar/             
    │   │   ├── CategoryList.jsx
    │   │   ├── MostLiked.jsx
    │   │   └── Sidebar.jsx
    │   ├── skeletons/          
    │   │   ├── SkeletonBlogDetail.jsx
    │   │   ├── SkeletonBlogList.jsx
    │   │   ├── SkeletonHero.jsx
    │   │   └── SkeletonSmallCard.jsx
    │   └── textEditor/         
    │       └── TipTapEditor.jsx
    ├── features/                
    │   ├── authSlice.js
    │   └── blogSlice.js
    ├── hooks/                   
    │   ├── useAuthCall.jsx
    │   └── useBlogCall.jsx
    ├── layout/                  
    │   ├── MainLayout.jsx
    │   └── ProtectedRouted.jsx
    ├── lib/                     
    │   ├── schemas.js
    │   └── slugify.js
    └── pages/                 
        ├── About.jsx
        ├── BlogDetail.jsx
        ├── Contact.jsx
        ├── Error.jsx
        ├── Home.jsx
        ├── Login.jsx
        ├── MyProfile.jsx
        ├── NewBlog.jsx
        └── Register.jsx
```

