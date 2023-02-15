import { ICategoria } from "../model/ICategoria";

export async function getCategories(): Promise<Array<ICategoria>> {
  const url = "https://api.mercadolibre.com/sites/MLB/categories";

  const response = await fetch(url);
  return response.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // console.log(`A função getProducts... foi chamada com argumentos ${categoryId} e ${query}`);

  let url;

  if (categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  } else if (categoryId && !query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else if (!categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } else {
    return new Promise((resolve) => {
      resolve({ results: [] });
    });
  }

  const response = await fetch(url);
  return response.json();
}

export async function getProductById(id) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  return response.json();
}
