import React from "react";
import { Link } from "react-router-dom";

interface iSearchProduct {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  price: string;
  // handleCartButton: Function;
}

export default function SearchProduct({
  id,
  title,
  category,
  thumbnail,
  price,
}: iSearchProduct) {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link
        to={`/product/${id}`}
        data-testid="product"
        className="block relative h-48 rounded overflow-hidden"
      >
        <img
          className="object-cover object-center w-full h-full block"
          src={thumbnail}
          alt={title}
          data-testid="product-detail-link"
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
        <p className="mt-1">
          R$ <span>{price}</span>
        </p>
      </div>

      {/*      <button
        data-testid="product-add-to-cart"
        onClick={(event) => handleCartButton(event)}
        id={id}
      >
        Adicionar ao carrinho
      </button>*/}
    </div>
  );
}
