import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/Cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLoginAction } from "../../actions/Login";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookie();
  useEffect(() => {
    navigate("/");
    dispatch(checkLoginAction(false));
  }, []);
  console.log("ok");
  return (
    <></>
  );
};

export default Logout;