import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useContext } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../Components/Context/AuthProvider";

const myTask = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const url = `https://next-gray-ten.vercel.app/mytask?email=${user?.email}`;
  const { data: mytask = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {});
      const data = await res.json();
      console.log(data);
      return data;
    },
  });


  const handleUser= singleTask=>{
	console.log(singleTask);
	fetch(`https://next-gray-ten.vercel.app/mytask/${singleTask}`,{
		method: 'DELETE',
		headers: {
			authorization: `bearer ${localStorage.getItem('accessToken')}`
		}
	}
	)
	.then(res=>res.json())
	.then(data=> {
		console.log(data)
		if(data.deletedCount>0){
			refetch()
			swal('Deleted Successfully')
			
		}
	})
}

const handleCompleteTask  = singleTask =>{
	const {name, email,task_area, task_date, 
		picture } = singleTask;

	const completeTasks ={
		name: name,
            picture: picture,
            task_date:task_date,
            task_area: task_area,
            email: email,

	}
	fetch('https://next-gray-ten.vercel.app/completed', {
		method: 'POST', 
		headers: {
			'content-type' : 'application/json',
		},
		body: JSON.stringify(completeTasks)
		
	})
	.then(res=>res.json())
	.then(result => {
		console.log(result)
		if(result.acknowledged){
			swal('Task added')
		}
	})
}

  return (
    <div>
      <Head>
        <title>My Task</title>
      </Head>

      <div>
        {mytask.map((singleTask) => (
          <>
            <div className="p-3 sm:p-12 bg-gray-600 text-gray-100">
              <div className="flex flex-col border space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <img
                  src={singleTask.picture}
                  alt=""
                  className="self-center flex-shrink-0 w-36 h-36 border rounded md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
                />
                <div className="">
                  <h4 className="text-lg font-semibold text-center md:text-left">
                    {singleTask.name}
                  </h4>
                  <p className="dark:text-gray-400">
                    Task: {singleTask.task_area}
                  </p>
                  <p className="dark:text-gray-400">
                    Date and Time: {singleTask.task_date}
                  </p>
				  <span className='text-xs border font-semibold'>{singleTask.status === 'Completed' ? 'Completed' : 'Not Completed'}</span>
                  <div className="flex justify-center pt-4 space-x-4 align-center">
                    <button onClick={()=>handleUser(singleTask._id)} className="bg-black px-2 py-1 text-white rounded">
                      Delete
                    </button>
                    <button className="bg-black px-2 py-1 text-white rounded">
                      Update
                    </button>
                    <button  onClick={()=>handleCompleteTask(singleTask)} className="bg-black px-2 py-1 text-white rounded">
                      Completed
                    </button>
					
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

export default myTask;
