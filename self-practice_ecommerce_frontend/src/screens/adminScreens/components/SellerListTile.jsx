import React from "react";
import { ShoppingBag, DollarSign, Package2 } from "lucide-react";
import ValueSubBox from "./ValueSubBox";

const ListTile = ({
  imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  name = "John Doe",
  totalOrders = 0,
  totalSpend = 0,
}) => {
  return (
    <>
      <div className="relative flex items-center gap-3 p-1">
        {/* Left side - Image with gradient ring */}
        <div className="flex-shrink-0 relative">
          <img
            src={imageUrl}
            alt={name}
            className="relative w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right side - User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 truncate mb-1 group-hover:text-purple-600 transition-colors duration-300">
            {name}
          </h3>

          <div className="flex items-center gap-2">
            {/* Orders Badge */}
            <ValueSubBox
              color="blue"
              value={totalOrders}
              icon={<ShoppingBag className="w-3 h-3 text-blue-700" />}
            />

            {/* Spend Badge */}
            <ValueSubBox
              color="purple"
              value={totalSpend}
              icon={<Package2 className="w-3 h-3 text-purple-700" />}
            />

            {/* Spend Badge */}
            <ValueSubBox
              color="green"
              value={totalSpend.toLocaleString()}
              icon={<DollarSign className="w-3 h-3 text-green-700" />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Demo with multiple users
export default function SellerListTile() {
  const users = [
    {
      imageUrl: "asd",
      name: "John Doe",
      totalOrders: 24,
      totalSpend: 1234.56,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      name: "Sarah Johnson",
      totalOrders: 18,
      totalSpend: 892.3,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      name: "Michael Chen",
      totalOrders: 42,
      totalSpend: 2567.89,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      name: "Emily Rodriguez",
      totalOrders: 15,
      totalSpend: 654.2,
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      name: "David Kim",
      totalOrders: 31,
      totalSpend: 1876.45,
    },
  ];

  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <ListTile
          key={index}
          imageUrl={user.imageUrl}
          name={user.name}
          totalOrders={user.totalOrders}
          totalSpend={user.totalSpend}
        />
      ))}
    </div>
  );
}
