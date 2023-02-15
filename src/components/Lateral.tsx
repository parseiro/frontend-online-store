import { useHistory } from "react-router-dom";
import SearchField from "./SearchField";
import { MenuItem } from "./MenuItem";
import Loading from "./Loading.js";
import { ICategoria } from "../services/CategoryService";

interface iLateralProps {
  categoriesList: ICategoria[];
  categoriesAreLoading: boolean;
  getProductsByCategory: Function;
  onChange: Function;
  onSubmit: Function;
  value: string;
}

export default function Lateral({
  categoriesList,
  categoriesAreLoading,
  getProductsByCategory,
  onChange,
  onSubmit,
  value,
}: iLateralProps) {
  const history = useHistory();

  const callback = () => history.push("/");

  return (
    <aside aria-label="Sidenav">
      <SearchField
        value={value}
        onChange={onChange}
        onSubmit={() => onSubmit(callback)}
      />
      <div
        className={
          "overflow-y-auto py-5 px-3 h-full bg-white border-r " +
          "border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        }
      >
        {categoriesAreLoading && <Loading />}

        {!categoriesAreLoading && (
          <ul
            className={
              "pt-5 mt-5 space-y-2 border-t border-gray-200 " +
              "dark:border-gray-700"
            }
          >
            {categoriesList.map((category) => (
              <MenuItem key={category.id} href="/">
                <button
                  value={category.id}
                  data-testid="category"
                  className="extraSmallButton m-1"
                  onClick={() => getProductsByCategory(category.id)}
                >
                  {category.name}
                </button>
              </MenuItem>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
