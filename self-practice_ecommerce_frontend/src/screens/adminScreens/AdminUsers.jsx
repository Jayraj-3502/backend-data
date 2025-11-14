import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsDetails,
  getAllSellersData,
  getAllUsersData,
} from "../../feature/admin.store";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.admin);

  const tableHeaderText = ["S.No", "Name", "Orders Count", "Orders Amount", ""];

  useEffect(() => {
    dispatch(getAllUsersData());
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
          {allUsers.map((user, index) => (
            <UsersTableRow
              key={user._id}
              sno={index + 1}
              id={user._id}
              name={user.fullname}
              totalOrderAmount={user.totalorderamount}
              totalOrders={user.totalorders}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersTableRow({
  sno,
  id,
  name = "",
  totalOrderAmount = 0,
  totalOrders = 0,
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{totalOrders}</td>
      <td className="px-6 py-4 text-sm text-gray-700">${totalOrderAmount}</td>
      <td className="px-6 py-4 text-center">
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition duration-200">
          Delete
        </button>
      </td>
    </tr>
  );
}
