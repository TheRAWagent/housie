  import { StrictMode } from 'react'
  import ReactDOM from 'react-dom/client'
  import { RouterProvider, createRouter } from '@tanstack/react-router'
  import { ClerkProvider } from '@clerk/clerk-react'
  import { Toaster } from 'react-hot-toast'
  import { dark } from '@clerk/themes'
  import './index.css'
  
  // Import the generated route tree
  import { routeTree } from './routeTree.gen'
  
  // Create a new router instance
  const router = createRouter({ routeTree })
  
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  if(!PUBLISHABLE_KEY) {
    throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not defined')
  }

  // Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={'/'} appearance={{baseTheme: dark}}>
      <Toaster />
      <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>,
  )
}

