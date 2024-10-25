import React, { useState,useRef, useEffect } from 'react'
import spinner from '../assets/spinner.svg'
import axios from 'axios'
import InputBox from './InputBox';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
const Base_Url = import.meta.env.VITE_BASE_URL;


function Body() {
  const navigate= useNavigate()
  const [signout,setSignout]= useState(true);
  const [loading,setLoading] = useState(false);
  const contentRef=useRef(null)
  const [title,setTitle]= useState("");
  const [content,setContent]= useState("");
  const [contentDisplay,setContentDisplay] = useState(false);
  const [fetchedData,setFetchedData]= useState([]);
  

  useEffect(()=>{
    // console.log("1");
    (async()=>{
      setLoading(true);
      const token= localStorage.getItem('token')
      if(!token){
            setTimeout(() => {
              navigate('/');
            },1000);
            return;
          }
      try{
            const id= token.id
            
            const response= await axios.get(`${Base_Url}/api/v1/getall`,{    
                headers:{
                    "authorization": token
                }
            })
            console.log(response.data.data);
            setFetchedData(response.data.data);
        }
        catch(err){
            console.error("Error fetching data:", err);
          }
          finally{
          setLoading(false);
        }
        

     })();
   },[navigate])

  

  

  useEffect(()=>{
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }

  },[content])


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
     console.log(title)
    
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(content)

    

  };




  const handleTitleButtonClick=()=>{
      
       setContentDisplay(prev=>!prev);
  }

  const handleContentButtonClick=async()=>{

    if(content!=""){
      setLoading(true);
      const token= localStorage.getItem("token");
      console.log(token);
       
      const response= await axios.post(`${Base_Url}/api/v1/notes`,{
         title,
         content,
         

      },{
      headers:{
        "authorization":token
      }
    } 
    )
      setLoading(false);
      console.log(response.data)
      const newNote = response.data;
      // console.log(newNote,2);
      setFetchedData(prevNotes => [...prevNotes, newNote]);

      console.log("post created")

    }

    setContent("");
    setTitle("");
    setContentDisplay(prev=>!prev);
    
}

const handleDelete = (id) => {
  setFetchedData(fetchedData.filter(note => note.id !== id));
};

if(loading){
  return <div className='absolute inset-0 bg-white flex justify-center items-center '><img src={spinner} alt="" /></div>
}


  return (
    <div>
      {<NavBar signOut={signout} />}
      <div className='w-full h-screen bg-[#6A8785] overflow-auto '>
        <div className='flex justify-center w-screen'>
        <input value={title} onChange={handleTitleChange}  className=' bg-[#DFD7DA] h-12 w-3/4 md:h-16 md:w-96   mt-7 rounded-md p-3' placeholder='Enter the title of the note' type="text" />

        <button  onClick={handleTitleButtonClick} className='md:h-16 md:w-28 h-12 w-16 bg-green-600 mt-7 ml-2 md:ml-7 hover:bg-green-700 transition duration-300 ease-in-out text-lg rounded-md '>Add</button>
        </div>
        
        {contentDisplay && (
           <div className='fixed inset-0 bg-black z-10 opacity-90 flex flex-col  items-center '>
            <button onClick={()=>{
              setContentDisplay(false)
              setContent("")
              setTitle("")
              }} className='absolute top-4 right-4 text-white '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
</button>
            <textarea
              value={content}
              onChange={handleContentChange}
              ref= {contentRef}
              className='bg-gray-500 w-11/12 md:h-16 md:w-96 rounded-md p-3 mt-16 z-20 opacity-200 focus:outline-none resize-none overflow-hidden font-sans font-semibold text-lg'
              placeholder='Take a note...'
              type="text"

        
              
              
            />

            <button  onClick={handleContentButtonClick} className='h-16 w-28 bg-green-600 mt-7 ml-8 hover:bg-green-700 transition duration-300 ease-in-out text-lg font-sans'>Add</button>

            </div>
   )}
   <div className='md:grid md:grid-cols-4 md:mt-10 flex flex-col items-center mt-5'> {fetchedData.map((note)=>{
       return <div key={note.id}><InputBox  id={note.id} title={note.title} content={note.content} date={note.date} onDelete={handleDelete}/></div>;
   })}</div>
  




      
    </div>
    </div>
  
    
  )
}

export default Body
