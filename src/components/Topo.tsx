import { Link } from 'react-router-dom';
import React from 'react';

export default function Topo() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link
            data-testid="shopping-cart-button"
            to="/shopping-cart"
          >
            Carrinho de compras
          </Link>
        </li>
      </ul>
    </nav>
  );
}
