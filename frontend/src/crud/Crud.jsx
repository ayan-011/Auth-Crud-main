//Crud.jsx
import React, { useEffect, useState } from 'react';
import TransitionsModal from '../crud/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { useCrudStore } from '../store/crudStore';
 

//Icons
import { LayoutDashboard } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const Crud = () => {

  //Deepseek
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteItem = useCrudStore((state) => state.deleteItem);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/crud', {
          withCredentials: true
        });
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

   


  //new
     // 💥 Delete function
  // const handleDelete = (id) => {
  //   const filteredPosts = posts.filter((post) => post.id !== id);
  //   setPosts(filteredPosts);
  // };
  //new

  //Deepseek

  // Handle delete
  const handleDelete = async (id) => {
    const result = await deleteItem(id);
    if (result.success) {
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } else {
      alert(result.message || 'Failed to delete post');
    }
  };

  return (
    
    <div className=' w-full min-h-screen overflow-y-auto  bg-zinc-950 absolute text-center'>
      <div className='w-full  flex justify-center'>
        

        <div className=" fixed top-0 z-10 bg-zinc-900/60 backdrop-blur-sm border-r-[1px] border-l-[1px] border-b-[1px] border-zinc-600 w-32 p-3 text-white text-center rounded-b-2xl">
          <span className=' cursor-pointer hover:text-white text-blue-400 ' >
            <TransitionsModal />
          </span>


        </div>


      </div> 
      <div className='bg-red-90  md:p-9'></div>

      <div className='w-full flex bg-red-90 items-center justify-center'>

      <div className="w-3/4 bg-red-90 p-5 flex justify-between items-center text-blue-400 ">
             
             <div className="1">
              <a href="/dashboard"><LayoutDashboard /></a>
             </div>
             <div className="2 text-3xl text-zinc-300 ">Make Your Own Post</div>
             <div className="3"></div>

      </div>
      </div>

       <div className='bg-red-90 md:p-9'></div>
      <div className="w-full bg-green-900 h-full overflow-y-auto"> 
        
      <div className="Cards bg-blue-90 lg:w-4/5 w-2/3 sm:2/3 md:w-6/7 bg-red-90 absolute   left-1/2 transform -translate-x-1/2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-8  bg-red-90 overflow-y-auto">

        {posts.map((post, index) => (
          <div key={index} className="group relative bg-[#25282c]  p-6 w-full sm:w-full lg:w-full flex-1 border-[1px] border-zinc-600 rounded-xl  select-none pointer-event-none  " >

            {/* Overlay div shown on hover */}
            <div className="absolute inset-0 bg-zinc-950/50 text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-100 ease-in-out flex items-center justify-center rounded-xl z-10 ">
              <p className="text-lg">{post.title}</p>
            </div>
            {/* end of Overlay  */}

            <div className="bg-blue-90 flex justify-between  relative">
              <div className="flex items-center space-x-3 group">
                <div className="picture h-8 w-8 rounded-full bg-zinc-900 overflow-hidden flex items-center justify-center">
                  {post.photo ? (
                    <img src={post.photo.startsWith('/uploads/') ? `http://localhost:5000${post.photo}` : post.photo} alt="profile" className="object-cover w-full h-full" />
                  ) : null}
                </div>
                <span className="name text-gray-400"> {post.name}</span>
              </div>
              <div className='text-gray-400 '>
                <div className="dropdown  z-20">
                  <div tabIndex={0} role="button" className=" cursor-pointer hover:text-white">. . .</div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a>Manage post</a></li>
                    <li><a>Item 2</a></li>
                    <li className='hover:bg-red-800 text-white'><a onClick={() => handleDelete(post._id)}>Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center text-gray-500 dark:text-gray-400">
              <span className='flex'>
                <p className='text-zinc-400 text-sm'>{post.message ? post.message.split(" ").filter(element => element.length !== 0).length : 0} Words in message</p>

              </span>
              <Link to={`/editupdate/${post._id}`}
                className="text-blue-500 hover:text-blue-400 underline z-10">
                  <div className=' flex underline'>
                    
                 view  <ArrowRight className='w-[15px]' />
                  </div>
              </Link>
            </div>
          </div>
        ))}



      </div>


      </div>
    </div>


  )
}

export default Crud