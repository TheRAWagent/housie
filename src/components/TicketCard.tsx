import clsx from "clsx";
import { useHousieStore } from "../store";

function TicketCard({idx}:{idx: number}) {
  const {tickets,confirmedNumbers} = useHousieStore();
  const numbers = tickets[idx];
  
    const are5Completed = numbers.flat().reduce((acc, number) => {
    if (confirmedNumbers.includes(number)) {
      acc++;
    }
    return acc;
  },0)>=5;
    const isHousieCompleted = numbers.flat().every((number) => confirmedNumbers.includes(number));
  return (
    <div className={clsx('flex-wrap border-2 border-b-4 p-3 mx-2 rounded-lg grid grid-rows-3', !are5Completed ? "border-red-500" :  isHousieCompleted ? 'border-green-500' : 'border-yellow-500')}>
        {numbers.map((number, index) => (
            <div key={`row-${index}`} className={clsx('py-1 flex gap-x-2 border-b-2 justify-center row-span-1', number.every(n => confirmedNumbers.includes(n)) ? 'border-b-green-500' : 'border-b-neutral-500')}>
                {number.map((num, idx) => (
                  <div key={`cell-${index}-${idx}`} className={clsx('text-3xl',confirmedNumbers.includes(num) ? 'text-green-500' : 'text-gray-500')}>
                    {num}
                  </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default TicketCard