import { useSelector } from "react-redux";

export default function ProfileDetails() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          {/* Profile Image */}
          <img
            src="asdfasdf"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />

          {/* Basic Details */}
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.fullname}
            </h2>
            <p className="text-gray-600 text-lg">{currentUser?.email}</p>
            <p className="text-gray-500">{currentUser?.phone}</p>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-blue-700">
              {currentUser?.totalorders}
            </h3>
            <p className="text-gray-600 text-sm">Orders Placed</p>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-green-700">
              ${currentUser?.totalorderamount}
            </h3>
            <p className="text-gray-600 text-sm">Total Spent</p>
          </div>

          <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-red-700">
              {currentUser?.cart.length}
            </h3>
            <p className="text-gray-600 text-sm">Cart Items</p>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Addresses</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <InfoSectionCard title={"Full Name"} description={"Amit Sharma"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoSectionCard({ title, description }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-gray-800 font-medium">{description}</p>
    </div>
  );
}
