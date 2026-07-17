<div align="center">

# Blog App

A full-stack blog platform where users can write, discover, and interact with blog posts — with likes, comments, saved reads, and category-based browsing.


</div>


## Key Features

**Authentication**
- Register / login with persisted sessions (JWT-based, via the backend)

**Blog Creation & Management**
- Write posts with a rich text editor (TipTap), including images, formatting, and tables
- Upload cover and content images through Cloudinary
- Edit or delete your own posts

**Discovery & Search**
- Search blogs by title or content
- Browse by category via the sidebar
- "Most Liked" and "Most Read" widgets to surface popular posts

**Interaction**
- Like posts and leave comments
- Save posts to a personal reading list / favorites

**Profile**
- Manage your account details
- View your own posts, favorites, and reading list from a dedicated profile page

**Polish**
- Skeleton loaders for a smoother loading experience
- Toast notifications and confirmation modals for key actions
- Fully responsive layout

## Tech Stack

### Frontend

- **React 19** + **Vite** — fast dev experience, modern React features
- **Redux Toolkit** + **Redux Persist** — global state for auth/blog data that survives page reloads
- **React Router** — client-side routing
- **Tailwind CSS** + **MUI** — utility-first styling combined with ready-made components where they save time
- **TipTap** — extensible rich text editor for writing posts
- **React Hook Form** + **Zod** — form state and schema validation without the boilerplate
- **Axios** — API requests
- **Cloudinary** — image hosting for post and profile images
- **Framer Motion**, **Swiper**, **Sonner** — animation, carousels, and toast notifications

### Backend

Built in a separate repo ([blog-app-backend](https://github.com/Aylaataydir/blog-app-backend)):

- **Node.js** + **Express** — REST API
- **TypeScript** — type safety across the API layer
- **MongoDB** + **Mongoose** — data storage and modeling
- **JWT** — authentication
- **Zod** — request validation

### Deployment

- **Vercel** — hosting for the frontend, configured with SPA rewrites (`vercel.json`)


### Prerequisites

- Node.js and npm


## Project Structure

```
src/
├── app/          # Store, router, and app-level setup
├── components/   # Reusable UI components
├── features/     # Redux slices (auth, blog)
├── hooks/        # Custom React hooks
├── layout/       # Layout components
├── lib/          # Utilities and validation schemas
└── pages/        # Route-level pages
```



