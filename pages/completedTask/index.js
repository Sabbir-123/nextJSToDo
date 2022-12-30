import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Components/Context/AuthProvider";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import Comments from "../../Components/Comment/Comments";

const completedTask = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(user);
  const url = ` https://next-gray-ten.vercel.app/completedTask?email=${user?.email}`;
  const { data: completedTask = [], refetch } = useQuery({
    queryKey: ["completedTask", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {});
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const handleDelete = (sTask) => {
    console.log(sTask);
    fetch(`https://next-gray-ten.vercel.app/complete/${sTask}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          swal("Deleted Successfully");
        }
      });
  };

  const handleNotCompleteTask = (sTask) => {
    const {name, email,task_area, task_date, 
      picture } = sTask;
  
    const inCompleteTasks ={
      name: name,
              picture: picture,
              task_date:task_date,
              task_area: task_area,
              email: email,
  
    }
    fetch("https://next-gray-ten.vercel.app/addtask", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(inCompleteTasks),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          swal("Task added to My Task Section");
        }
      });
  };

  const handleAddProdut = (data) => {
    const newComments = {
      name: user?.displayName,
      comments: data.comments,
      email: user?.email,
    };
    fetch("https://next-gray-ten.vercel.app/addComments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newComments),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          swal("Comments added");
        }
      });
  };


  

  return (
    <div>
      <Head>
        <title>Completed Task</title>
      </Head>
      <div>
        {completedTask.map((sTask) => (
          <>
            <div className="p-3 sm:p-12 bg-gray-600 text-gray-100">
              <div className="p-3 sm:p-12 bg-gray-600 text-gray-100">
                <div className="flex flex-col border space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                  <img
                    src={sTask.picture}
                    alt=""
                    className="self-center flex-shrink-0 w-36 h-36 border rounded md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
                  />
                  <div className="">
                    <h4 className="text-lg font-semibold text-center md:text-left">
                      {sTask.name}
                    </h4>
                    <p className="dark:text-gray-400">
                      Task: {sTask.task_area}
                    </p>
                    <p className="dark:text-gray-400">
                      Date and Time: {sTask.task_date}
                    </p>
                    <span className="text-xs border font-semibold">
                      {"Completed"}
                    </span>
                    <div className="flex justify-center pt-4 space-x-4 align-center">
                      <button
                        onClick={() => handleDelete(sTask._id)}
                        className="bg-black px-2 py-1 text-white rounded"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleNotCompleteTask(sTask)}
                        className="bg-black px-2 py-1 text-white rounded"
                      >
                        Not Completed
                      </button>
                    </div>
                  </div>
                  <div>
                    <form
                      className="justify-center items-center"
                      onSubmit={handleSubmit(handleAddProdut)}
                    >
                      <div className="form-control w-full max-w-">
                        <label className="label">
                          {" "}
                          <span className="label-text">Add Your Comment</span>
                        </label>
                        <br />
                        <textarea
                          type="text"
                          {...register("comments", {
                            required: "Name is Required",
                          })}
                          className="textarea shadow-lg p-2 my-3 text-black shadow-gray-600 textarea-bordered w-full max-w-lg rounded-lg  "
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="grid justify-center ">
                        <input
                          className="btn btn-accent px-3 py-2  w-full mt-4 border rounded border-black"
                          value="Add Comments"
                          type="submit"
                        />
                      </div>
                    </form>
                  </div>
                  <div>
                    <h1>Comments</h1>
                    <Comments></Comments>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default completedTask;
