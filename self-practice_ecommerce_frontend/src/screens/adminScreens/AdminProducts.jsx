import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsDetails,
} from "../../feature/admin.store";
import { FaArrowTrendUp, FaBoxArchive, FaBoxOpen } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import HighDetailCard from "./components/HighDetailCard";
import StatsCard from "../../components/cards/StatsCard";
import HeaderSection from "./components/HeaderSection";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllProductsDetails());
  }, []);

  async function deleteProductFunction(id) {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProductsDetails());
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <HeaderSection
          title="Products Management"
          description="Manage your product inventory and sales"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={allProducts.length}
            icon={<FaBoxArchive className="w-6 h-6 text-white-600" />}
            color="blue"
          />
          <StatsCard
            title="In Stock"
            value={allProducts.filter((p) => p.stock > 0).length}
            icon={<SiTicktick className="w-6 h-6 text-white-600" />}
            color="green"
          />

          <StatsCard
            title="Total Sold"
            value={allProducts.reduce(
              (sum, p) => sum + (p.totalSelled || 0),
              0
            )}
            icon={<FaArrowTrendUp className="w-6 h-6 text-white-600" />}
            color="purple"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product, index) => (
            <ProductCard
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
        </div>
      </div>
    </div>
  );
}

function ProductCard({ sno, name, price, stock, totalSold, clickAction }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Card Body */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-slate-800 mb-4 truncate">
          {name}
        </h3>

        {/* Product Details Grid */}
        <div className="space-y-3 mb-5">
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <HiCurrencyDollar className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Price</span>
            </div>
            <span className="text-lg font-bold text-slate-800">${price}</span>
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  stock > 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <FaBoxOpen
                  className={`w-4 h-4 ${
                    stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-slate-600">Stock</span>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                stock > 0
                  ? "text-green-700 bg-green-50 border border-green-200"
                  : "text-red-700 bg-red-50 border border-red-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              {stock > 0 ? `${stock} units` : "Out"}
            </span>
          </div>

          {/* Total Sold */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaArrowTrendUp className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Sold</span>
            </div>
            <span className="text-lg font-bold text-purple-600">
              {totalSold}
              <span className="text-xs font-normal text-slate-500 ml-1">
                units
              </span>
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={clickAction}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <MdDelete className="w-4 h-4 mr-2" />
          Delete Product
        </button>
      </div>
    </div>
  );
}
