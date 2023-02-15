import { getProductById, getProductsFromCategoryAndQuery } from "./api.js";
import { iCartItem } from "./ICartItem";

const cache = new Map();

export function armazenaProdutosEmCache(produtos: Array<iCartItem>) {
  produtos.forEach((p: iCartItem) => {
    // console.log(`Salvando em cache o produto com id ${p.id}`);
    cache.set(p.id, p);
  });
}

export const searchProducts = async ({ categoryId, input }) => {
  const json = await getProductsFromCategoryAndQuery(categoryId, input);
  const produtos = json.results;

  armazenaProdutosEmCache(produtos);
  return produtos;
};

export const getProductFromCacheById = (productId: string) =>
  cache.get(productId);

export const fetchProductById = (productId: string) => {
  const encontro = cache.get(productId);
  if (encontro) {
    console.log("Produto encontrado no cache");
    return Promise.resolve(encontro);
  }
  return getProductById(productId);
};
