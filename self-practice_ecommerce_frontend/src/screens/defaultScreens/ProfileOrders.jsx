import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomerOrder } from "../../feature/order.store";
import { getCustomerOrders } from "../../feature/customer.store";

export default function ProfileOrders() {
  const tableHeaderText = [
    "S.No",
    "Product Name",
    "Quantity",
    "Price",
    "Total",
    "Status",
  ];

  const dispatch = useDispatch();
  const { allOrders = [] } = useSelector((state) => state.customer);
  const { tokenDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCustomerOrders(tokenDetails));
  }, []);

  useEffect(() => {
    console.log(allOrders);
  }, [allOrders]);

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
          {console.log(allOrders)}
          {allOrders.map((order, index) => {
            return (
              <UserOrdersTableRow
                key={order.products[0].product._id}
                sno={index + 1}
                id={order.products[0].product._id}
                name={order.products[0].product.name}
                quantity={order.products[0].quantity}
                price={order.products[0].price}
                status={order.status}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function UserOrdersTableRow({
  sno,
  id,
  name = "",
  quantity = "",
  price = "",
  status = "",
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        {name.slice(0, 15)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{quantity}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{price}</td>
      <td className="px-6 py-4 text-sm text-gray-700">${price * quantity}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{status}</td>
    </tr>
  );
}
