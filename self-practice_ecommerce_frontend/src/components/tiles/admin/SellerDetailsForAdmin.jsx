import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

export default function SellerDetailsForAdmin({
  sellernmae = "",
  totalNumberOfProducts = 0,
  totalProductsSelled = 0,
  totalProductsSelledAmount = 0,
}) {
  return (
    <div className="p-3 shadow bg-white rounded-full flex flex-row gap-5 min-w-fit w-[300px]">
      <div>
        <img
          src="ef"
          alt="IMG"
          className="h-[50px] w-[50px] rounded-full bg-gray-200"
        />
      </div>
      <div>
        <div>
          <div className="text-[16px] font-medium">Seller Name</div>
        </div>
        <div className="flex flex-row gap-7">
          <div className="flex flex-row gap-2 items-center">
            <span>
              <FaCartShopping color="gray" />
            </span>
            <span>{totalNumberOfProducts}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <MdSell color="red" />
            </span>
            <span>{totalProductsSelled}</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <RiMoneyRupeeCircleFill color="green" />
            </span>
            <span>{totalProductsSelledAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
