import SearchProduct from "./SearchProduct";

interface SearchResultProps {
  searchResult: any[];
  handleCartButton: Function;
}

export default function SearchResult({
  searchResult,
  handleCartButton,
}: SearchResultProps) {
  const empty = searchResult.length === 0;

  return (
    <>
      {empty && <p className="text-center">Nenhum produto foi encontrado</p>}

      {!empty && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {searchResult.map(({ id, title, category, price, thumbnail }) => (
                <SearchProduct
                  key={id}
                  thumbnail={thumbnail}
                  title={title}
                  price={price}
                  handleCartButton={(event) => handleCartButton(event)}
                  id={id}
                  category={category}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
