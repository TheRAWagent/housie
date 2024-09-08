import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react';
import TicketCard from '../../components/TicketCard';
import AddHousieModal from '../../components/AddHousieModal';
import { useHousieStore } from '../../store';

export const Route = createFileRoute('/housie/create')({
  component: () => <HousiePage />,
})

function HousiePage() {
    const {tickets } = useHousieStore();
    const [addHousieModal, setAddHousieModal] = useState(false);
    const router=useRouter();

  return (
    <div className="w-screen flex flex-col items-center my-10">
        {tickets.map((_, index) => (
            <TicketCard key={index} idx={index} /> 
        ))}
        {addHousieModal && <AddHousieModal isOpen={addHousieModal} onClose={() => setAddHousieModal(false)} />}
        <button
        onClick={() => setAddHousieModal(true)}
        type="button"
        className="mt-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Ticket
      </button>
      <button
        onClick={() => router.navigate({from: '/housie/create', to: '/housie/play'})}
        type="button"
        className="mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Start Housie
      </button>
    </div>
  )
}