import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct.js";
import Loading from "../components/Loading.js";

export default function ShoppingCart({ cartMap }) {
  const [lista, setLista] = useState();
  const [vazio, setVazio] = useState(true);
  const [value, setValue] = useState(false);

  useEffect(() => {
    // console.log('ShoppingCart notificado de alteração no cartMap');
    const novaLista = Object.keys(Object.fromEntries(cartMap));
    const novaLista2 = novaLista.map((id) => cartMap.get(id));
    // console.log(JSON.stringify(novaLista2));

    setLista(novaLista2);
    setVazio(novaLista2.length === 0);
  }, [cartMap, value]);

  if (!lista) return <Loading />;

  return (
    <div>
      {vazio && (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}

      {!vazio && (
        <div>
          {lista.map((valor) => (
            <CartProduct
              key={valor.id}
              id={valor.id}
              title={valor.title}
              quantity={valor.quantity}
              onClickMinus={() => {
                valor.quantity -= 1;
                setValue(!value); // force update
              }}
              onClickPlus={() => {
                valor.quantity += 1;
                // console.log('Tentando mudar o numero para: ', JSON.stringify(valor));
                setValue(!value); // force update
              }}
              onClickRemove={() => {
                cartMap.delete(valor.id);
                setValue(!value); // force update
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
