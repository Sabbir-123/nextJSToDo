import Head from 'next/head'
import { Inter } from '@next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>

      <div className='lg:w-11/12 md:w-11/12 w-full mx-auto relative'>
                <div>
                    <Slider {...settings}>
                        <div>
                            <img src={`https://i.ibb.co/yFs8SyR/1.png`} alt="" />
                           
                        </div>
                        <div>
                            <img src={`https://i.ibb.co/HNhdYT5/2.png`} alt="" />
                         
                        </div>
                        <div>
                            <img src={`https://i.ibb.co/Lzn8ywB/3.png`} alt="" />
                        
                        </div>
                        
                    </Slider>
                </div>
               <div className='mx-auto my-auto justify-center flex'>
               <div className='md:absolute hidden lg:top-1/4 md:top-1/4  md:flex flex-col items-center justify-center space-y-2  bg-black bg-opacity-70 p-10 rounded-lg'>
                    <h1 className='lg:text-6xl md:text-3xl font-semibold text-slate-100 text-center'>Don't Miss Your Work Again</h1>
                    <p className='lg:text-3xl md:text-xl font-normal text-slate-200 text-center'>Just Write Your Task Down, Keep Yourself Disciplined</p>
                   <Link href={'/addTask'}>
                   <button className='bg-primary text-md bg-gradient-to-r from-secondary py-2 px-5 rounded border hover:bg-white hover:text-black text-white'>Add Your Task</button>
                   </Link>
                </div>
               </div>
            </div>


    </>
  )
}
