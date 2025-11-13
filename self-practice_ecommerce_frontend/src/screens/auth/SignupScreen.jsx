import { useState } from "react";
import {
  Button,
  Dropdown,
  InputField,
  SubmitButton,
} from "../../components/componentsExport";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignupScreen() {
  const [inputDetails, setInputDetails] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const [confirmpassword, setConfirmPassword] = useState("");
  const [verificationOtp, setVerificationOtp] = useState("");
  const [popupEnable, setPopupEnable] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    if (inputDetails.password !== confirmpassword) {
      toast.error("Passwords are not matching");
      return;
    }
    console.log("Password are Matched");

    const response = await axios.post("http://localhost:3000/regester", {});

    if (response.success) {
      setPopupEnable(true);
    }

    console.log(response);
  }

  async function handleOtpVerification() {
    const response = await axios.post();
  }

  return (
    <>
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-10 shadow-2xl min-w-fit w-fit p-5 rounded-xl mx-auto items-center"
      >
        <div className="text-5xl font-bold">Signup</div>
        <div className="flex flex-col gap-2 items-center">
          <div>
            <InputField
              name="fullname"
              type="text"
              defaultValue={inputDetails.fullname}
              placeholderText="Enter Full Name"
              required={true}
              updaterFunction={(event) => {
                setInputDetails((prev) => ({
                  ...prev,
                  fullname: event.target.value,
                }));
                console.log(event.target.value);
              }}
            />
          </div>
          <div>
            <InputField
              name="email"
              type="email"
              defaultValue={inputDetails.email}
              placeholderText="Enter Emial"
              required={true}
              updaterFunction={(event) => {
                setInputDetails((prev) => ({
                  ...prev,
                  email: event.target.value,
                }));
                console.log(event.target.value);
              }}
            />
          </div>
          <div>
            <InputField
              name="password"
              type="password"
              defaultValue={inputDetails.password}
              placeholderText="Enter Password"
              required={true}
              updaterFunction={(event) => {
                setInputDetails((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
                console.log(event.target.value);
              }}
            />
          </div>
          <div>
            <InputField
              name="confirmpassword"
              type="password"
              defaultValue={confirmpassword}
              placeholderText="Enter Confirm Password"
              required={true}
              updaterFunction={(event) => {
                setConfirmPassword(event.target.value);
                console.log(event.target.value);
              }}
            />
          </div>
          <div>
            <InputField
              name="phone"
              type="tel"
              defaultValue={inputDetails.phone}
              placeholderText="Enter Phone Number"
              required={true}
              updaterFunction={(event) => {
                const value = event.target.value;
                if (
                  (value >= "a" && value <= "z") ||
                  (value >= "A" && value <= "Z")
                ) {
                  console.log(event.target.value, "rhis");
                } else {
                  setInputDetails((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }));
                  console.log(event.target.value);
                }
              }}
            />
          </div>
          <div>
            <Dropdown
              name="role"
              defaultValue={inputDetails.role}
              required={true}
              updaterFunction={(event) => {
                setInputDetails((prev) => ({
                  ...prev,
                  role: event.target.value,
                }));
                console.log(event.target.value);
              }}
              values={["user", "seller"]}
            />
          </div>
          <div className="mt-5">
            <SubmitButton text="Submit" buttonType="submit" />
          </div>
        </div>
      </form>

      <form>
        <div>Verification</div>
        <div>OTP is sent to you email {inputDetails.email}</div>
        <div>
          <InputField
            name="otp"
            type="text"
            defaultValue={verificationOtp}
            placeholderText="Enter OTP"
            required={true}
            disable={!popupEnable}
            updaterFunction={(event) => {
              setVerificationOtp(event.target.value);
            }}
          />
        </div>
      </form>
    </>
  );
}
