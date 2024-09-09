import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { useHousieStore } from "../store";

function AddHousieModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [numbers, setNumbers] = useState<string[]>(["", "", ""]);
  const { addTicket } = useHousieStore();

  const addNewTicket = () => {
    try {
      const line1 = numbers[0].split(",").map((e) => parseInt(e));
      const line2 = numbers[1].split(",").map((e) => parseInt(e));
      const line3 = numbers[2].split(",").map((e) => parseInt(e));
      const uniqueNumbers = [...new Set([...line1, ...line2, ...line3])];
      if (uniqueNumbers.length !== line1.length + line2.length + line3.length) {
        toast.error("Numbers must be unique across all lines");
        return;
      }
      
      addTicket([line1, line2, line3]);
    } catch (e) {
      toast.error("Invalid input");
      return;
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex flex-row items-center justify-between mb-2">
              <DialogTitle
                as="h3"
                className="text-2xl/7 font-medium text-white"
              >
                Add ticket for housie
              </DialogTitle>
              <XMarkIcon className="size-6" onClick={onClose} />
            </div>
            <Line
              lineNumber={1}
              value={numbers[0]}
              setValue={(e) => setNumbers([e, numbers[1], numbers[2]])}
            />
            <Line
              lineNumber={2}
              value={numbers[1]}
              setValue={(e) => setNumbers([numbers[0], e, numbers[2]])}
            />
            <Line
              lineNumber={3}
              value={numbers[2]}
              setValue={(e) => setNumbers([numbers[0], numbers[1], e])}
            />
            <div className="mt-4">
              <Button
                onClick={addNewTicket}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              >
                Add Ticket
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

function Line({
  lineNumber,
  setValue,
  value
}: {
  lineNumber: number;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        Line {lineNumber}
        {"("}comma separated{")"}
      </label>
      <div className="mt-2">
        <input
          id={`line-${lineNumber}`}
          name={`line-${lineNumber}`}
          type="string"
          className="block w-full rounded-md border-0 py-1.5 px-3 bg-transparent text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default AddHousieModal;
