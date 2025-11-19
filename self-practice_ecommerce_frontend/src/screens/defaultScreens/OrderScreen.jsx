import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Popup } from "../../components/componentsExport";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";

export default function OrderScreen() {
  const dispatch = useDispatch();
  const { currentProductDetails } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);

  const [qty, setQty] = useState(1);
  const [isOpen, setIsOpen] = useState();

  function increaseQty() {
    if (qty < currentProductDetails.stock) {
      setQty(qty + 1);
    }
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  function onSubmitAction(event) {
    event.preventDefault();
    console.log("This is running", event);
  }

  const subTotal = currentProductDetails.price * qty;
  const gst = subTotal * 0.06;
  const total = subTotal + gst;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Buy Now</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 border rounded-lg shadow space-y-5">
            <div className="flex gap-5">
              <img
                src={currentProductDetails.image}
                alt={currentProductDetails.name}
                className="w-28 h-28 object-cover rounded"
              />

              <div className="flex flex-col justify-between">
                <h2 className="text-xl font-semibold">
                  {currentProductDetails.name}
                </h2>

                <p className="text-gray-600">
                  Brand: {currentProductDetails.brand}
                </p>
                <p className="text-gray-600">
                  Color: {currentProductDetails.color}
                </p>

                <p className="text-lg font-semibold text-green-600">
                  ${currentProductDetails.price}
                </p>

                {currentProductDetails.stock ? (
                  <span className="text-sm text-green-600 font-medium">
                    ✔ In Stock
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">
                    ✖ Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>

              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQty}
                  className="bg-gray-300 px-3 py-1 rounded text-xl font-bold hover:bg-gray-400"
                >
                  −
                </button>

                <span className="text-xl font-semibold">{qty}</span>

                <button
                  onClick={increaseQty}
                  className="bg-gray-300 px-3 py-1 rounded text-xl font-bold hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="p-5 border rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
            <div className="space-y-3">
              {currentUser.address.length === 0 ? (
                <button onClick={() => setIsOpen(true)}>Add Address</button>
              ) : (
                <div>Address</div>
              )}
            </div>
            <AddressPopup
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSubmitAction={onSubmitAction}
            />
          </div>

          {/* Payment Method */}
          <div className="p-5 border rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" className="h-4 w-4" />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="p-5 border rounded-lg shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2">
            <OrderSummery
              title="Product Price"
              value={`${subTotal.toFixed(2)}`}
            />
            <OrderSummery title="Quantity" value={qty} />
            <OrderSummery title="GST (6%)" value={`${gst.toFixed(2)}`} />
            <OrderSummery title="Delivery Charge" value="Free" />

            <div className="border-t my-3"></div>

            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            disabled={!currentProductDetails.stock}
            className={`mt-6 w-full py-3 text-white text-lg font-medium rounded-md shadow
              ${
                currentProductDetails.stock
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderSummery({ title = "", value = "" }) {
  return (
    <div className="flex justify-between text-gray-700">
      <span>{title} :</span>
      <span className="text-green-600">{value}</span>
    </div>
  );
}

function AddressPopup({
  isOpen,
  setIsOpen,
  onSubmitAction,
  product,
  setProduct,
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={"Add Product"}
    >
      <form action="" onSubmit={onSubmitAction}>
        <InputFieldSecond
          label="Street"
          name="street"
          type="text"
          defaultValue={""}
          placeholderText={"Enter Street"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            // setProduct((prev) => ({ ...prev, name: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="City"
          name="city"
          type="text"
          defaultValue={""}
          placeholderText={"Enter City"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            // setProduct((prev) => ({
            //   ...prev,
            //   description: event.target.value,
            // }));
          }}
        />
        <InputFieldSecond
          label="State"
          name="state"
          type="text"
          defaultValue={""}
          placeholderText={"Enter State"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            // setProduct((prev) => ({ ...prev, price: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Zipcode"
          name="zipcode"
          type="text"
          defaultValue={""}
          placeholderText={"Enter Zipcode"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            // setProduct((prev) => ({ ...prev, brand: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Country"
          name="country"
          type="text"
          defaultValue={""}
          placeholderText={"Enter Country"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            // setProduct((prev) => ({ ...prev, color: event.target.value }));
          }}
        />
        <button
          type="submit"
          onClick={() => setIsOpen(false)}
          className=" w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition"
        >
          submit
        </button>
      </form>
    </Popup>
  );
}
