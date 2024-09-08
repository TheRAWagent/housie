import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/16/solid";
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
  const [numbers, setNumbers] = useState<number[]>([]);
  const { addTicket } = useHousieStore();
  const [newNumber, setNewNumber] = useState<number>(1);

  const addNumber = () => {
    if (newNumber < 1 || newNumber > 90) {
      toast.error("Number should be between 1 and 90");
    } else if (numbers.includes(newNumber)) {
      toast.error("Number already exists");
    } else {
      setNumbers([...numbers, newNumber]);
    }
    setNewNumber(1);
  };

  const addNewHousie = () => {
    if (numbers.length < 15) {
      toast.error("Ticket should have atleast 15 numbers");
    } else {
      addTicket(numbers);
      toast.success("Ticket added successfully");
      onClose();
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
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex flex-row items-center justify-between mb-2">
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Add ticket for housie
              </DialogTitle>
              <XMarkIcon className="size-6" onClick={onClose} />
            </div>
            <div>
              <div>
                {numbers.map((number, index) => (
                  <span className="relative text-3xl px-2">
                    {number}
                    <XCircleIcon
                      className="size-3 text-red-600 absolute top-0 right-0"
                      onClick={() =>
                        setNumbers(numbers.filter((_, i) => i !== index))
                      }
                    />
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between ml-2">
                <label htmlFor="number" className="text-white">
                  Number
                </label>
                <div className="flex items-center gap-x-4">
                  <input
                    className="bg-gray-500 h-8 rounded-md text-center"
                    type="number"
                    value={newNumber}
                    onChange={(e) => setNewNumber(parseInt(e.target.value))}
                    id="number"
                    max={90}
                    min={1}
                    inputMode="numeric"
                  />
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={addNumber}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={addNewHousie}
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

export default AddHousieModal;
