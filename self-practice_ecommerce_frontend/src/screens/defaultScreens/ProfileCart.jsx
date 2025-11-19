import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerCartData } from "../../feature/customer.store";

export default function ProfileCart() {
  const dispatch = useDispatch();
  const tableHeaderText = ["S.No", "Product Name", "Brand", "Price", ""];
  const { currentUser } = useSelector((state) => state.user);
  const { allCartItems } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerCartData(currentUser._id));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaderText.map((text, index) => (
              <th
                key={index + 1}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {allCartItems.map((product, index) => {
            console.log(product.product);
            return (
              <UserCartTableRow
                key={product.product._id}
                sno={index + 1}
                productId={product.product._id}
                name={product.product.name}
                color={product.product.color}
                price={product.product.price}
                stock={product.product.stock}
                brand={product.product.brand}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function UserCartTableRow({
  sno,
  productId,
  name,
  color,
  price,
  stock,
  brand,
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{brand}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{price}</td>
      <td className="px-6 py-4 text-center"></td>
    </tr>
  );
}
