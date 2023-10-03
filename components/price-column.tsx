import React, { useState } from 'react';
import { PencilIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline'

interface PriceColumnProps {
  initialPrice: number;
}

function PriceColumn({ initialPrice }: PriceColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(initialPrice);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // You can add logic here to save the updated price, e.g., send it to the server
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // If the user cancels editing, reset the price to its initial value
    setPrice(initialPrice);
    setIsEditing(false);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value));
  };
  console.log(typeof initialPrice)

  return (
    <td className="p-4">
      {isEditing ? (
        <div className="flex align-items gap-3">
          <input
            className="rounded-md border-gray-300 w-32"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
          <button onClick={handleSaveClick}>
            <CheckIcon className="w-4 h-4 text-green-500" />
          </button>
          <button onClick={handleCancelClick}>
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <div className="flex align-items gap-2">
          {price}
          <button onClick={handleEditClick}>
            <PencilIcon className="w-5 h-5 p-[3px] text-blue-500" />
          </button>
        </div>
      )}
    </td>
  );
}

export default PriceColumn;
