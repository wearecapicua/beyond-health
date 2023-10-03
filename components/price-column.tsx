import React, { useState } from 'react';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline'

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

  return (
    <td>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
          <button onClick={handleSaveClick}>
            <CheckIcon className="w-5 h-5 text-green-500" />
          </button>
          <button onClick={handleCancelClick}>
            <PencilIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
      ) : (
        <div>
          {price}
          <button onClick={handleEditClick}>
            <PencilIcon className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      )}
    </td>
  );
}

export default PriceColumn;
