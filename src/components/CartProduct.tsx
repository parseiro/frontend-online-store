import React from "react";

interface iCartProductProps {
  id: string;
  title: string;
  quantity: number;
  onClickMinus: Function;
  onClickPlus: Function;
  onClickRemove: Function;
}

export default function CartProduct({
  id,
  title,
  quantity,
  onClickMinus,
  onClickPlus,
  onClickRemove,
}: iCartProductProps) {
  return (
    <div className="flex flex-row justify-between items-center border">
      <p>{id}</p>
      <p data-testid="shopping-cart-product-name">{title}</p>

      <div className="flex flex-row items-center">
        <button
          data-testid="product-decrease-quantity"
          className="material-symbols-outlined border border-gray-300"
          disabled={quantity === 1}
          onClick={() => onClickMinus()}
        >
          remove
        </button>
        <p
          data-testid="shopping-cart-product-quantity"
          className="w-[20px] text-center"
        >
          {quantity}
        </p>
        <button
          data-testid="product-increase-quantity"
          className="material-symbols-outlined border border-gray-300"
          onClick={() => onClickPlus()}
        >
          add
        </button>
        <button
          data-testid="remove-product"
          className="material-symbols-outlined"
          onClick={() => onClickRemove()}
        >
          delete
        </button>
      </div>
    </div>
  );
}
