import Link from "next/link";
import { useContext, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../Components/Context/AuthProvider";
import { useForm } from 'react-hook-form';
import Head from "next/head";
import { useRouter } from 'next/router'
const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
  const { signIn,signinGoogle, user } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loginUserEmail, setLoginUserEmail]= useState('');
  let router= useRouter()

  const handleLogin = data => {
      console.log(data);
      setLoginError('');
      signIn(data.email, data.password)
          .then(result => {
              const user = result.user;
              setLoginUserEmail(data.email)
              router.push('/')
          })
          .catch(error => {
              console.log(error.message)
              setLoginError(error.message);
          });
  }

    const handleGoogleSignIn =()=>{
        signinGoogle()
        .then(result =>{
          console.log(result.user);
          swal('Google Log in Successful')
          router.push('/')
        })
        .catch((error)=>{
          swal(error.message)
        })
      }
    return (
       <>
        <Head>
        <title>Sign In</title>
        
      </Head>
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 bg-slate-800 p-7 rounded-2xl'>
                <h2 className='text-4xl text-center font-bold text-white '>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold text-white">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input my-2 input-bordered py-1 px-2 rounded w-full max-w-xs  hover:cursor-pointer" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text font-bold text-white">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered py-1 px-2 my-2  rounded w-full max-w-xs  hover:cursor-pointer" />
                        <label className="label"> <span className="label-text my-2 text-white">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <div className="grid justify-center my-2">
                    <input className='btn btn-secondary bg-slate-600 hover:bg-white hover:cursor-pointer hover:text-black text-white border rounded w-full px-5' value="Login" type="submit" />
                   
                    </div>
                   <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
<div className=" text-white">
<p>You are new here? <Link className='text-secondary' href="/SignUp">Create new Account</Link></p>
                <div className="divider text-center">OR</div>
               <div className="grid justify-center my-2">
               <button onClick={handleGoogleSignIn} className=' btn  bg-slate-600 hover:bg-white hover:cursor-pointer rounded-lg px-5 border py-1 hover:text-black  btn-outline w-full'>CONTINUE WITH GOOGLE</button>
               </div>
</div>
            </div>
        </div>
       </>
    );
};

export default SignIn;