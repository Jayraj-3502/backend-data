import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../feature/products.store";
import NewProductCard from "../../components/cards/NewProductCard";
import { useEffect } from "react";

export default function DefaultHomeScreen() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsData());
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-5xl font-bold mb-10">Products Details</h1>
      <div className="flex flex-row gap-3 flex-wrap">
        {allProducts.map((product) => {
          const { name, price, stock, _id } = product;
          return (
            <NewProductCard
              key={_id}
              name={name}
              stock={stock}
              price={price}
              id={_id}
            />
          );
        })}
      </div>
    </div>
  );
}
