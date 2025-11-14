import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsDetails,
  getAllSellersData,
} from "../../feature/admin.store";

export default function AdminSeller() {
  const dispatch = useDispatch();
  const { allSellers } = useSelector((state) => state.admin);

  const tableHeaderText = [
    "S.No",
    "Name",
    "Products Count",
    "Selled Count",
    "Total Revenue",
    "",
  ];

  useEffect(() => {
    dispatch(getAllSellersData());
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
          {allSellers.map((seller, index) => (
            <SellerTableRow
              key={seller._id}
              sno={index + 1}
              id={seller._id}
              name={seller.fullname}
              totalProductCount={seller.totalproductofseller}
              totalSelledCount={seller.totalproductsselled}
              totalSellRevenue={seller.totalproductsselledamount}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SellerTableRow({
  sno,
  id,
  name = "",
  totalProductCount = 0,
  totalSelledCount = 0,
  totalSellRevenue = 0,
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{totalProductCount}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{totalSelledCount}</td>
      <td className="px-6 py-4 text-sm text-gray-700">${totalSellRevenue}</td>
      <td className="px-6 py-4 text-center">
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition duration-200">
          Delete
        </button>
      </td>
    </tr>
  );
}
