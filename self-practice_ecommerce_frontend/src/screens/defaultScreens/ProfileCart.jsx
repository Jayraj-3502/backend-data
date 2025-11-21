import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerCartData,
  removeToCustomerCart,
} from "../../feature/customer.store";
import { MdDelete } from "react-icons/md";
import { getCurrentProductDetails } from "../../feature/products.store";
import { useNavigate } from "react-router-dom";
import { tokenVerfication } from "../../feature/users.store";

export default function ProfileCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableHeaderText = ["S.No", "Product Name", "Brand", "Price", ""];
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const { allCartItems } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerCartData(currentUser._id));
  }, [currentUser]);

  async function buyButton(productId) {
    await dispatch(getCurrentProductDetails(productId));

    navigate("/dashboard/buynow");
  }

  async function deleteButton(productId) {
    await dispatch(
      removeToCustomerCart({
        token: tokenDetails,
        productId,
      })
    );
    await dispatch(tokenVerfication());
  }

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
          {allCartItems &&
            allCartItems.map((product, index) => {
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
                  onClickBuy={() => {
                    buyButton(product.product._id);
                  }}
                  onClickDelete={() => {
                    deleteButton(product.product._id);
                  }}
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
  price,
  brand,
  onClickBuy,
  onClickDelete,
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{brand}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{price}</td>
      <td className="px-6 py-4 flex flex-row justify-center items-center gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition duration-200"
          onClick={onClickBuy}
        >
          Buy
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition duration-200"
          onClick={onClickDelete}
        >
          <MdDelete fontSize={"20px"} />
        </button>
      </td>
    </tr>
  );
}
