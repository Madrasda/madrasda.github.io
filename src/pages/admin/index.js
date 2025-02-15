import Head from "next/head";
import { getRole, isTokenValid } from "@/utils/JWTVerifier";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/context";
import { Alert, Button, Snackbar } from "@mui/material";
import { API_URL } from "@/utils/constants";

export default function Adminlogin() {
  useEffect(() => {
    const token = localStorage.getItem("token_admin");
    if (token && isTokenValid(token) && getRole(token) === "ROLE_ADMIN")
      router.push("/admin/vendorlist");
    setLoading(false);
  }, []);

  const [mail, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);
  const ctx = useContext(UserContext);
  const router = useRouter();
  let isReady = router.isReady;
  const [loading, setLoading] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const adminlogin = (e) => {
    e.preventDefault();
    axios
      .post(
        API_URL + "/api/auth/loginAdmin",
        {
          email: mail,
          password: password,
        }
      )
      .then((response) => {
        localStorage.setItem("token_admin", response.data.token);
        ctx.setIsLoggedIn(true);
        router.push("/admin/vendorlist");
      })
      .catch((err) => {
        setOpen(true);
        setMessage("Please check your credentials");
        setSeverity("error");
      });
  };

  return (
    <>
      <Head>
      <meta name="description" content="Madrasda is India's first content creators marketplace, providing a one-stop destination for official merchandise of your favorite content creators. Discover a diverse range of products from top Indian creators Shop now and get exclusive merchandise at Madrasda."/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <title>Madrasda | Login</title>
      </Head>
      <Snackbar
        className={"mt-7"}
        open={open}
        autoHideDuration={1400}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {!loading && (
        <div className="bg-center bg-no-repeat bg-cover flex bg-[url(/socialmedia.webp)] w-screen h-screen">
          <div className="w-full bg-cover bg-center flex-center flex-row bg-transparent max-w-md m-auto backdrop-blur-md bg-black/90 rounded-3xl drop-shadow-2xl py-8 px-16">
            <div className="flex flex-wrap justify-center">
              <div className="w-24">
                <img src="/logo.png" alt="LOGO" />
              </div>
            </div>
            <div className="flex flex-wrap mt-2 justify-center"></div>
            <h1 className="text-2xl text-white font-medium mt-2 mb-12 text-center">
              LOGIN
            </h1>
            <form onSubmit={adminlogin}>
              <div
                className="text-xl text-[#A5153F] m-2 text-center"
                id="responsesection"
              ></div>
              <div>
                <label htmlFor="email" className="text-white">
                  Username
                </label>
                <input
                  type="email"
                  className={
                    "w-full p-2 text-primary rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  }
                  id="username"
                  placeholder="example@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    "w-full p-2 text-primary rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  }
                  id="password"
                  placeholder="**********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center w-full items-center mt-3">
                <Button
                  variant={"contained"}
                  style={{
                    background:
                      "linear-gradient(45deg, #ffa000 30%, #ffc107 90%)",
                    color: "white",
                  }}
                  type={"submit"}
                >
                  Login
                </Button>
              </div>
            </form>
            <br />
          </div>
        </div>
      )}
    </>
  );
}
