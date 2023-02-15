import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";
import Lateral from "../components/Lateral";
import Topo from "../components/Topo";
import Product from "../components/Product";
import ShoppingCart from "./ShoppingCart";
import SearchResult from "../components/SearchResult";
import {
  getProductFromCacheById,
  searchProducts,
} from "../services/ProductService";
import { iCartItem } from "../services/ICartItem";
import {
  categoriesList,
  ICategoria,
  ICategoriesCache,
  initializeCategories,
} from "../services/CategoryService";

enum SearchState {
  WAITING_USER_SUBMIT,
  WAITING_SERVER,
  SHOW_ANSWER,
}

interface iState {
  searchState: SearchState;
  categoriesAreLoading: boolean;
  searchTextInput: string;
  searchResult: any[];
  cartMap: Map<string, iCartItem>;
  categories: ICategoriesCache;
}

const initialState: iState = {
  searchState: SearchState.WAITING_USER_SUBMIT,
  categoriesAreLoading: true,
  searchTextInput: "",
  searchResult: [],
  cartMap: new Map(),
  categories: {
    categoriesMap: new Map<string, ICategoria>(),
    categoriesList: new Array<ICategoria>(),
  },
};

class Home extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.setState({ categoriesAreLoading: true }, () => {
      initializeCategories(this.state.categories).then(() => {
        this.setState({ categoriesAreLoading: false });
      });
    });
  }

  handleAddToCartButton = (id: string) => {
    // adiciona o produto e mostra a quantidade desse produto no carrinho

    const { cartMap } = this.state;
    const cartObject = cartMap.get(id) || {
      id,
      title: getProductFromCacheById(id).title,
      quantity: 0,
    };

    cartObject.quantity += 1;
    // console.log('Adicionando ao carrinho: ', JSON.stringify(cartObject));
    cartMap.set(id, cartObject);
    // this.setCartMap(cartMap);
  };

  executeSearch = (categoryId: string, searchInput: string) => {
    this.setState({ searchState: SearchState.WAITING_SERVER }, () =>
      searchProducts({
        categoryId,
        input: searchInput,
      }).then((searchResult) => {
        // console.log('Resultado da pesquisa:', searchResult);
        this.setState({
          searchResult,
          searchState: SearchState.SHOW_ANSWER,
        });
      })
    );
  };

  render() {
    const {
      categoriesAreLoading,
      searchTextInput,
      searchState,
      searchResult,
      cartMap,
    } = this.state;
    // console.log(searchResult);

    if (searchState === SearchState.WAITING_SERVER) return <Loading />;

    return (
      <>
        <Topo />

        <Lateral
          value={searchTextInput}
          onChange={(event: { target: { value: string } }) => {
            const { value } = event.target;
            this.setState({ searchTextInput: value });
          }}
          onSubmit={() => this.executeSearch("", searchTextInput)}
          categoriesList={categoriesList()}
          categoriesAreLoading={categoriesAreLoading}
          getProductsByCategory={(categoryId: string) =>
            this.executeSearch(categoryId, "")
          }
        />
        <main>
          <Switch>
            <Route
              path="/product/:id"
              render={(props) => (
                <Product
                  {...props}
                  handleCartButton={this.handleAddToCartButton}
                />
              )}
            />
            <Route
              exact
              path="/shopping-cart"
              render={(props) => <ShoppingCart {...props} cartMap={cartMap} />}
            />
            <Route exact path="/">
              {searchState === SearchState.SHOW_ANSWER && (
                <SearchResult
                  searchResult={searchResult}
                  handleCartButton={this.handleAddToCartButton}
                />
              )}
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default Home;
