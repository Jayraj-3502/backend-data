import { useState } from "react";
import { InputField, SubmitButton } from "../../components/componentsExport";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/users.store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [loginDetalis, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log(token);
    const data = await dispatch(loginUser(loginDetalis));
    console.log(data.payload.success);
    if (data.payload.success) {
      toast.success("User Loggind in");
    }
  }

  return (
    <form
      action=""
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-10 shadow-2xl min-w-fit w-fit p-5 rounded-xl mx-auto items-center"
    >
      <div className="text-5xl font-bold">Login</div>
      <div className="flex flex-col gap-2 items-center">
        <div>
          <InputField
            name="email"
            type="eamil"
            defaultValue={loginDetalis.email}
            placeholderText="Enter Email"
            required={true}
            updaterFunction={(event) => {
              setLoginDetails((prev) => ({
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
            defaultValue={loginDetalis.password}
            placeholderText="Enter Password"
            required={true}
            updaterFunction={(event) => {
              setLoginDetails((prev) => ({
                ...prev,
                password: event.target.value,
              }));
              console.log(event.target.value);
            }}
          />
        </div>
        <div className="mt-5">
          <SubmitButton text="Submit" buttonType="submit" />
        </div>
      </div>
    </form>
  );
}
