import React, { useState, useEffect } from 'react';
import { PencilIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { adminUpdateData } from "lib/api/supabase";

interface PriceColumnProps {
  product: any;
  userId: string;
  onPriceUpdate: (userId: string, newPrice: number) => void;
}

function PriceColumn({ product, userId, onPriceUpdate }: PriceColumnProps) {
  const initialPrice = product?.price
  const { default_price, name } = product ?? {}
  const [isEditing, setIsEditing] = useState(false);
  const [priceStr, setPriceStr] = useState((initialPrice ?? '').toString());
  const [priceNum, setPriceNum] = useState(initialPrice);

  useEffect(() => {
    setPriceStr((priceNum ?? '').toString());
  }, [priceNum])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Parse the edited price string and update priceNum
    const newPriceNum = parseFloat(priceStr);
   
    if (!isNaN(newPriceNum)) {
      setPriceNum(newPriceNum);
      const updatedProduct = {
        product: {
          default_price,
          name,
          price: newPriceNum
        }
      }
      adminUpdateData(updatedProduct, userId)
      onPriceUpdate(userId, newPriceNum);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // If the user cancels editing, reset the edited price string to match the numeric value
    setPriceStr(priceNum.toString());
    setIsEditing(false);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceStr(event.target.value);
  };

  const formattedPrice = (priceNum / 100).toFixed(2);

  return (
    <td className="p-4">
      {isEditing ? (
        <div className="flex align-items gap-3">
          <input
            className="rounded-md border-gray-300 w-32"
            type="text"
            value={priceStr}
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
          {formattedPrice}
          <button onClick={handleEditClick}>
            <PencilIcon className="w-5 h-5 p-[3px] text-blue-500" />
          </button>
        </div>
      )}
    </td>
  );
}

export default PriceColumn;
