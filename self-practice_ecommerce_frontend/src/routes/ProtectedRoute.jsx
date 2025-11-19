import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowdRole }) {
  const { currentUser, userExist } = useSelector((state) => state.user);
  console.log(currentUser);
  console.log("Protected Route is running");
  console.log(children);

  if (!userExist) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowdRole !== currentUser?.role)
    return <Navigate to={"/login"} replace />;

  return children;
}
