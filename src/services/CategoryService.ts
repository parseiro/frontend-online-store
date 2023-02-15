import { getCategories } from "./api";

export interface ICategoria {
  id: string;
  name: string;
}

export interface ICategoriesCache {
  categoriesMap: Map<string, ICategoria>;
  categoriesList: Array<ICategoria>;
}

export function getCachedCategoryById(id: string): ICategoria | undefined {
  return categoriesCache.categoriesMap.get(id);
}

const categoriesCache: ICategoriesCache = {
  categoriesList: [],
  categoriesMap: new Map(),
};

export function initializeCategories(
  cat: ICategoriesCache
): Promise<ICategoria[]> {
  categoriesCache.categoriesList = cat.categoriesList;
  categoriesCache.categoriesMap = cat.categoriesMap;
  return loadCategories();
}

export function categoriesList(): ICategoria[] {
  return categoriesCache.categoriesList;
}
export function categoriesIdList(): string[] {
  return categoriesCache.categoriesList.map((c) => c.id);
}

export function categoriesNameList(): Array<string> {
  console.log("lista", categoriesCache.categoriesList);
  const mapeado = categoriesCache.categoriesList.map((c) => c.name);
  console.log("mapeado", mapeado);
  return mapeado;
}

export function loadCategories(): Promise<ICategoria[]> {
  if (categoriesCache.categoriesList.length === 0) {
    return getCategories().then((r) => {
      categoriesCache.categoriesList = r;
      r.forEach((c) => {
        categoriesCache.categoriesMap.set(c.id, c);
      });
      return r;
    });
    /*.then((r) => {
        console.log("Puxei as categorias!", r);
        return r;
      })*/
    // console.log('Puxando categorias do ML');
  }
  return Promise.resolve(categoriesCache.categoriesList);
}
