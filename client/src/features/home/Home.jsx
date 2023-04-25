import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    const result = await sendLogout();
    console.log("result: ", result);
    console.log("isSuccess: ", isSuccess);
    console.log("isLoading: ", isLoading);

    // dispatch(logOut());
    // setTimeout(() => {
    //   dispatch(apiSlice.util.resetApiState());
    // }, 1000);
    navigate("/login");
  };

  const Logo = () => {
    return (
      <div>
        <div className="font-['Sigmar'] font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-white-100 to-white-100">KONOK</div>
      </div>
    );
  };

  return (
    <div>
      <div>Home</div>
      <button onClick={logoutHandler}>Logout</button>
      <div className="mb-20">
        {/* <Logo /> */}
      </div>
    </div>
  );
}
