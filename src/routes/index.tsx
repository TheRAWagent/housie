import { ClerkLoading, useAuth } from '@clerk/clerk-react';
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <HomeRoute />
})

function HomeRoute() {
  const {userId, isLoaded } = useAuth();
  const router = useRouter();

  if(!isLoaded) {
    return <ClerkLoading />;
  }

  if(!userId) {
    router.navigate({from: '/', to: '/sign-in'});
  }
  
  return <div className='flex flex-col justify-center items-center mt-10'>
    <h1 className='text-4xl'>Welcome to the housie app</h1>
    <button
        onClick={() => router.navigate({from: '/', to: '/housie/create'})}
        type="button"
        className="mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Start new housie
      </button>
  </div>
}