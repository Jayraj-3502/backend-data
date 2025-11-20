import { useEffect } from "react";
import {
  FaBox,
  FaWarehouse,
  FaShoppingCart,
  FaUsers,
  FaCheckCircle,
  FaMoneyBill,
  FaTruck,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeliveryStatusForSeller,
  getTotalFilterForSeller,
} from "../../feature/seller.store";

export default function SellerHome() {
  const dispatch = useDispatch();
  const { currentUser, tokenDetails } = useSelector((state) => state.user);
  const { totalFilters, deliveryStatus } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getTotalFilterForSeller(tokenDetails));
    dispatch(getDeliveryStatusForSeller(tokenDetails));
  }, [tokenDetails]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main */}
      <main className="p-6">
        {/* ====== MAIN STATS CARDS ====== */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              icon={<FaBox className="text-blue-500 text-3xl" />}
              title="Total Products"
              value={currentUser.totalproductofseller}
            />

            <Card
              icon={<FaWarehouse className="text-teal-500 text-3xl" />}
              title="Total Stock"
              value={totalFilters.totalStockCount}
            />

            <Card
              icon={<FaShoppingCart className="text-green-500 text-3xl" />}
              title="Total Orders"
              value={totalFilters.totalOrderCount}
            />

            <Card
              icon={<FaUsers className="text-purple-500 text-3xl" />}
              title="Total Customers"
              value={totalFilters.totalCustomersCount}
            />

            <Card
              icon={<FaCheckCircle className="text-orange-500 text-3xl" />}
              title="Items Sold"
              value={currentUser.totalproductsselled}
            />

            <Card
              icon={<FaMoneyBill className="text-yellow-500 text-3xl" />}
              title="Total Revenue"
              value={currentUser.totalproductsselledamount}
            />
          </div>
        </section>

        {/* ====== ORDER STATUS CARDS ====== */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card
              icon={<FaHourglassHalf className="text-yellow-500 text-3xl" />}
              title="Pending"
              value={deliveryStatus.pending}
            />

            <Card
              icon={<FaBox className="text-blue-500 text-3xl" />}
              title="Processing"
              value={deliveryStatus.processing}
            />

            <Card
              icon={<FaTruck className="text-indigo-500 text-3xl" />}
              title="Shipping"
              value={deliveryStatus.shipping}
            />

            <Card
              icon={<FaCheckCircle className="text-green-600 text-3xl" />}
              title="Delivered"
              value={deliveryStatus.delivered}
            />

            <Card
              icon={<FaTimesCircle className="text-red-500 text-3xl" />}
              title="Cancelled"
              value={deliveryStatus.cancled}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ===== Reusable Card Component ===== */
function Card({ icon, title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}
