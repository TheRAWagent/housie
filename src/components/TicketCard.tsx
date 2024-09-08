import clsx from "clsx";
import { useHousieStore } from "../store";

function TicketCard({idx}:{idx: number}) {
  const {tickets,confirmedNumbers} = useHousieStore();
  const numbers = tickets[idx];
    const isHousieCompleted = confirmedNumbers.length === 15 && confirmedNumbers.every((number) => numbers.includes(number));
  return (
    <div className={clsx('flex-wrap flex border-2 border-b-4 p-3 mx-2 rounded-lg', isHousieCompleted ? 'border-green-500' : 'border-yellow-500')}>
        {numbers.map((number, index) => (
            <div key={index} className={clsx('text-3xl px-2', confirmedNumbers.includes(number) ? 'text-green-500' : 'text-white')}>
                {number}
            </div>
        ))}
    </div>
  )
}

export default TicketCard