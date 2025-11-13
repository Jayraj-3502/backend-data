import { FaLongArrowAltRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SellerDetailsForAdmin } from "../../componentsExport";
import { MdSell } from "react-icons/md";

export default function SellerMainCard({ displayData = [] }) {
  return (
    <div className="shadow p-5 min-w-fit w-[500px]">
      <div className="text-2xl font-bold">Seller Detail</div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-7">
          <div className="flex flex-row gap-2 items-center">
            <span>
              <FaCartShopping color="gray" />
            </span>
            <span>
              <FaLongArrowAltRight />
            </span>
            <span>Total Product Number</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <MdSell color="red" />
            </span>
            <span>
              <FaLongArrowAltRight />
            </span>
            <span>Selled Products</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <RiMoneyRupeeCircleFill color="green" />
            </span>
            <span>
              <FaLongArrowAltRight />
            </span>
            <span>Products Selled Amount</span>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex flex-col gap-2">
        {displayData.map((user, index) => {
          console.log(user);
          return (
            <SellerDetailsForAdmin
              key={user.id}
              sellernmae={user.fullname}
              totalNumberOfProducts={user.totalNumberOfProducts}
              totalProductsSelled={user.totalProductsSelled}
              totalProductsSelledAmount={user.totalProductsSelledAmount}
            />
          );
        })}
      </div>
    </div>
  );
}
