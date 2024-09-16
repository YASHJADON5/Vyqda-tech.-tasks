import React, { useState,useRef, useEffect } from 'react'

import axios from 'axios'
import InputBox from './InputBox';
const Base_Url = import.meta.env.VITE_BASE_URL;

function Body() {
  
  const contentRef=useRef(null)
  const [title,setTitle]= useState("");
  const [content,setContent]= useState("");
  const [contentDisplay,setContentDisplay] = useState(false);
  const [fetchedData,setFetchedData]= useState([]);
  

  useEffect(()=>{
    (async()=>{
        try{
            const response= await axios.get(`${Base_Url}/api/v1/getall`)
            console.log(response.data.data);
            setFetchedData(response.data.data);
        }
        catch(err){
            console.error("Error fetching data:", err);
        }
        

     })();
   },[])

  

  

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
       
      const response= await axios.post(`${Base_Url}/api/v1/notes`,{
         title,
         content
      })
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


  return (
    <div className='w-full h-screen bg-[#6A8785] '>
        <div className='flex justify-center w-screen'>
        <input value={title} onChange={handleTitleChange}  className=' bg-[#DFD7DA] h-16 w-96  mt-7 rounded-md p-3' placeholder='Enter the title of the note' type="text" />

        <button  onClick={handleTitleButtonClick} className='h-16 w-28 bg-green-600 mt-7 ml-8 hover:bg-green-700 transition duration-300 ease-in-out text-lg font-sans'>Add</button>
        </div>
        
        {contentDisplay && (
           <div className='fixed inset-0 bg-black z-10 opacity-90 flex flex-col justify-center items-center '>
            <textarea
              value={content}
              onChange={handleContentChange}
              ref= {contentRef}
              className='bg-gray-500 h-16 w-96 rounded-md p-3 mt-16 z-20 opacity-200 focus:outline-none resize-none overflow-hidden font-sans font-semibold text-lg'
              placeholder='Take a note...'
              type="text"
              
              
            />

            <button  onClick={handleContentButtonClick} className='h-16 w-28 bg-green-600 mt-7 ml-8 hover:bg-green-700 transition duration-300 ease-in-out text-lg font-sans'>Add</button>

            </div>
   )}
   <div className='grid grid-cols-4 mt-10'> {fetchedData.map((note)=>{
       return <div><InputBox key={note.id} id={note.id} title={note.title} content={note.content} date={note.date} onDelete={handleDelete}/></div>;
   })}</div>
  




      
    </div>
  )
}

export default Body
