import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsDetails,
} from "../../feature/admin.store";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.admin);

  const tableHeaderText = [
    "S.No",
    "Name",
    "Price",
    "Stock",
    "Total Sold",
    "action",
  ];

  useEffect(() => {
    dispatch(getAllProductsDetails());
  }, []);

  async function deleteProductFunction(id) {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProductsDetails());
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
          {allProducts.map((product, index) => (
            <ProductTableRow
              key={product._id}
              sno={index + 1}
              name={product.name}
              price={product.price}
              stock={product.stock}
              totalSold={product.totalSelled}
              id={product._id}
              clickAction={() => {
                deleteProductFunction(product._id);
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductTableRow({ sno, name, price, stock, totalSold, clickAction }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">${price}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 text-xs font-medium ${
            stock > 0
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }  rounded-full`}
        >
          {/*    */}
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{totalSold}</td>
      <td className="px-6 py-4 text-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition duration-200"
          onClick={clickAction}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
