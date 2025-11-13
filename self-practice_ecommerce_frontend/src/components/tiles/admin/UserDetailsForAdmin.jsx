import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

export default function UserDetailsForAdmin({
  username = "",
  totalOrders = 0,
  totalAmount = 0,
}) {
  return (
    <div className="p-3 shadow  rounded-full flex flex-row gap-5 min-w-fit w-[300px]">
      <div>
        <img
          src="ef"
          alt="IMG"
          className="h-[50px] w-[50px] rounded-full bg-gray-200"
        />
      </div>
      <div>
        <div>
          <div className="text-[16px] font-medium">User Name {username}</div>
        </div>
        <div className="flex flex-row gap-7">
          <div className="flex flex-row gap-2 items-center">
            <span>
              <FaCartShopping color="grey" />
            </span>
            <span>{totalOrders}</span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <span>
              <RiMoneyRupeeCircleFill color="green" />
            </span>
            <span>{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
