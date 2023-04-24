import { useSendLogoutMutation } from "../auth/authApiSlice";

export default function Home() {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();


  const logoutHandler = () => {
    sendLogout()
  }

  return (
    <div>
      <div>Home</div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
