import { useRef, useState } from "react";

export default function OTPInput({ data }) {
  const inputs = useRef([]);
  const [finalOtp, setFinalOtp] = useState("");
  const [verifyEnable, setVerifyEnable] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^[0-9]?$/.test(value)) return;

    // Move to next input
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Move back when deleting
    if (!value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  function verification() {
    inputs?.current.forEach((value) => {
      setFinalOtp((prev) => prev + value.value);
    });

    setVerifyEnable(true);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-center gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              maxLength="1"
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={verification}
          disabled={verifyEnable}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 transition disabled:bg-blue-900"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
