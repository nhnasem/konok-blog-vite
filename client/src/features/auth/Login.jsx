import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  const [persist, setPersist] = usePersist();
  // setPersist(true)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrorMsg("No Server Response");
      } else if (err.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <section className="border px-4 py-3 w-[400px] translate-y-[30%] mx-auto my-10 rounded-lg shadow-md">
      <header className="text-center">
        <h1 className="mt-5 mb-10 tracking-widest text-3xl font-light text-green-600">Login</h1>
      </header>
      <main>
        <p ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
        <form
          className="flex flex-col justify-start mx-10"
          onSubmit={handleSubmit}
        >
          <label className="text-sm text-gray-500 mb-1 font-light tracking-wider" htmlFor="email">Email:</label>
          <input
            className="text-gray-700 bg-green-100 border px-4 py-2 w-full rounded-md mb-4"
            type="text"
            id="email"
            ref={userRef}
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required
          />

          <label className="text-sm text-gray-500 mb-1 font-light tracking-wider" htmlFor="password">Password:</label>
          <input
            className="text-gray-700 bg-green-100 mb-1 border px-4 py-2 w-full rounded-md"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />

          <button className="w-full rounded-md px-4 py-[10px] bg-green-600 text-white-100 mb-16 mt-5 text-center">Log in</button>

          {/* <label className="px-4 py-2 bg-green-800 text-white-100 w-[250px]" htmlFor="persist">
            <input
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust this device
          </label> */}
        </form>
      </main>
      {/* <footer className="text-center text-blue-600 tracking-wider mb-4 mt-2 hover:underline">
        <Link to="/">Back to Home</Link>
      </footer> */}
    </section>
  );

  return content;
};

export default Login;
