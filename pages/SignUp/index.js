import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Components/Context/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, signinGoogle, setLoading } =
    useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");

  const handleSignUp = (data) => {
    console.log(data);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        swal("User Created Successfully.");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            savedUser(data.name, data.email);
          })

          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  const savedUser = (name, email) => {
    const user = { name, email };
    fetch("https://next-gray-ten.vercel.app/usersall", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCratedUseremail(email);
      });
  };

  const handleGoogleSignin = () => {
    signinGoogle().then((result) => {
      console.log(result.user);
      //   setAuthToken(result.user)
      setLoading(false);
      navigate(from, { replace: true });
    });
  };

  return (
    <>
    <Head>
        <title>Sign Up</title>
        
      </Head>
    <div className="h-[800px]  flex justify-center items-center">
      <div className="w-96 p-7 bg-slate-800 rounded-lg border">
        <h2 className="text-white font-bold  text-center text-2xl ">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text font-bold text-white">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input my-2 input-bordered py-1 px-2 rounded w-full max-w-xs  hover:cursor-pointer"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text font-bold text-white">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input my-2 input-bordered py-1 px-2 rounded w-full max-w-xs  hover:cursor-pointer"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text font-bold text-white">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
              })}
              className="input my-2 input-bordered py-1 px-2 rounded w-full max-w-xs  hover:cursor-pointer"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid justify-center">
          <input
            className="btn btn-accent px-2 py-1 w-full mt-4 text-white border rounded"
            value="Sign Up"
            type="submit"
          />
          </div>
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
       <div className="text-white griid justify-center">
       <p>
          Already have an account{" "}
          <Link className="text-secondary" href="/Signin">
            Please Login
          </Link>
        </p>
        <div className="divider text-center">OR</div>
        <div className="grid justify-center">
        <button onClick={handleGoogleSignin} className="btn btn-accent px-2 py-1 w-full mt-4 text-white border rounded">
          CONTINUE WITH GOOGLE
        </button>
        </div>
       </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
