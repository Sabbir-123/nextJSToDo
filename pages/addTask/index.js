import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Components/Context/AuthProvider';
import Head from "next/head";
const addTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = new Date().toLocaleString()

    const imagekey = '8cafa7700ddb609a54ab949219ac23a5';

    const handleAddProdut = data =>{

const img = data.picture[0];

    const formData = new FormData();
    formData.append('image', img);
    const url = `https://api.imgbb.com/1/upload?key=8cafa7700ddb609a54ab949219ac23a5`
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res=>res.json())
    .then(imageData=> {
        if(imageData.success){
            console.log(imageData.data.url)
        const newProdutct ={
        
            name: user?.displayName,
            picture: imageData.data.url,
            task_date: data.task_date,
            task_area: data.task_area,
            email: user?.email,

        }
console.log(newProdutct)
        // save mobiles into mobiles db

        fetch('https://next-gray-ten.vercel.app/addtask', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json',
                },
                body: JSON.stringify(newProdutct)
                
            })
            .then(res=>res.json())
            .then(result => {
                console.log(result)
                if(result.acknowledged){
                    swal('Task added')
                    
                }
            })
        
        
        
        }})



    }
    

    const handleKeyDown = (event, data) => {
        if (event.key === 'Enter') {
            const task ={
                name: user?.displayName,
                task_area: data?.task_area,
                email: user?.email,
            }
            
        fetch('https://next-gray-ten.vercel.app/addtask', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data);
           if(data.acknowledged){
            swal('Task Added')
           }
           else{
            swal(data.message)
           }
        })
          }  
    }
  
    

  
    return (
       <div>
         <Head>
        <title>Add Task</title>
      </Head>
        <div className='m-10'>
        <div className='h-1/2 flex justify-center items-center'>
       <div className='w-2/3 lg:w-1/2 p-7 rounded-lg border  border-black'>
           <h2 className='text-xl text-center'>Add Task</h2>
           <form className='justify-center items-center'  onKeyDown={handleKeyDown} onSubmit={handleSubmit(handleAddProdut)}>
               <div className="form-control w-full max-w-">
                   <label className="label"> <span className="label-text">Date & Time</span></label>
                   <br />
                   <input type="text" {...register("task_date", {
                       required: "Email is Required"
                   })}defaultValue={date} className="input my-3 input-bordered w-full shadow-lg p-2  shadow-gray-600 textarea-bordered w-full max-w-lg rounded-lg " />
                   {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
               </div>

               
               {/* Picture Added to imgbb */}
               <div className="form-control w-full max-w-">
                   <label className="label"> <span className="label-text">Picture</span></label>
                   <br />
                   <input type="file" {...register("picture", {
                   })} className="input input-bordered my-3 w-full shadow-lg p-2  shadow-gray-600 textarea-bordered  max-w-lg rounded-lg" />
                   {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
               </div>
          
               <div className="form-control w-full max-w-">
                   <label className="label"> <span className="label-text">Task</span></label>
                   <br />
                   <textarea type="text" {...register("task_area", {
                       required: "Name is Required"
                   })} className="textarea shadow-lg p-2 my-3  shadow-gray-600 textarea-bordered w-full max-w-lg rounded-lg  " />
                   {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
               </div>
               
              
               
              
            <div className='grid justify-center '>
            <input className='btn btn-accent px-3 py-2  w-full mt-4 border rounded border-black hover:cursor-pointer' value="Add Product" type="submit" />
            </div>
           </form>

       </div>
   </div>
   </div>
       </div>
    );
};

export default addTask;