import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useHousieStore } from "../../store";
import TicketCard from "../../components/TicketCard";
import toast from "react-hot-toast";
import { useState } from "react";

export const Route = createFileRoute("/housie/play")({
  component: () => <HousiePlay />,
});

function HousiePlay() {
  const { tickets, addConfirmedNumber, reset } = useHousieStore();
  const router = useRouter();
  const [newConfirmedNumber, setNewConfirmedNumber] = useState<number>(1);

  if (tickets.length === 0) {
    toast.error("No tickets found. Please create a ticket first");
    router.navigate({ to: "/housie/create" });
  }

  const addNumber = (num: number) => {
    if (num < 1 || num > 90) {
      toast.error("Number should be between 1 and 90");
      return;
    }
    addConfirmedNumber(num);
  };

  return (
    <div className="mt-10 mx-8">
      {tickets.map((_, index) => (
        <TicketCard key={index} idx={index} />
      ))}
      <div className="my-4 flex flex-col items-center justify-start">
        <input
          type="number"
          className="w-48 text-center p-2 border bg-transparent rounded-md text-5xl"
          value={newConfirmedNumber}
          onChange={(e) => setNewConfirmedNumber(parseInt(e.target.value))}
        />
        <button
          onClick={() => addNumber(newConfirmedNumber)}
          type="button"
          className="mt-4 rounded-md bg-indigo-600 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Add Number
        </button>
        <button
          onDoubleClick={() => {
            reset();
            router.navigate({ to: "/housie/create" });
          }}
          type="button"
          className="mt-4 rounded-md bg-rose-600 px-5 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
