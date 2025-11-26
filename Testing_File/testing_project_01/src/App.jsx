import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    file: "",
  });

  function submitAction(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <form action="" onSubmit={submitAction}>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, fullname: event.target.value }));
          }}
          placeholder="Enter Name"
          id="fullname"
        />
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, email: event.target.value }));
          }}
          placeholder="Enter Email"
        />
        <input
          type="file"
          name="image"
          id="image"
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, file: event.target.value }));
          }}
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />
        <button type="submit">Submit</button>
      </form>

      <img src={formData.file || "asd"} alt="asd" />
    </>
  );
}

export default App;
