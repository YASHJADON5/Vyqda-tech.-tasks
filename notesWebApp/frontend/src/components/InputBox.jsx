import React,{useEffect,useRef,useState} from 'react'
import DeleteIcon from '../assets/DeleteIcon.svg'
import axios from 'axios'

const Base_Url = import.meta.env.VITE_BASE_URL;

function InputBox({title,content,date,id,onDelete}) {

    const [textArea1Value, setTextArea1Value] = useState(title);
    const [textArea2Value, setTextArea2Value] = useState(content);
    

    const textArea1Ref = useRef(null);
    const textArea2Ref = useRef(null);

    useEffect(() => {
        if (textArea1Ref.current) {
            textArea1Ref.current.style.height = 'auto';
            textArea1Ref.current.style.height = `${textArea1Ref.current.scrollHeight}px`;
        }
        if (textArea2Ref.current) {
            textArea2Ref.current.style.height = 'auto';
            textArea2Ref.current.style.height = `${textArea2Ref.current.scrollHeight}px`;
        }
    }, [textArea1Value, textArea2Value]); 

    const handleDelete=async()=>{

        await axios.delete(`${Base_Url}/api/v1/delete`,{
            data: { id }
        })
        onDelete(id);
        console.log("successfull");

    }

    const handleUpdate=async()=>{
        await axios.put(`${Base_Url}/api/v1/update`,{
            id,
            content:textArea2Value,
            title:textArea1Value
        })
        console.log("successfully updated")
    }


  
  return (
    <div className='bg-[#DFD7DA] w-72 rounded-md p-6 flex mx-4 mb-4'>
        <div>
            <textarea className='w-full bg-[#DFD7DA] focus:outline-none  my-2 text-3xl overflow-hidden resize-none' type="text" rows="1" placeholder='Title'
            ref={textArea1Ref}
            value={textArea1Value}
            onChange={(e) => setTextArea1Value(e.target.value)}
          
           
            />
            <textarea className='w-full bg-[#DFD7DA] focus:outline-none my-2 text-2xl overflow-hidden resize-none'  type="text" rows="1" placeholder='i want to'
            ref={textArea2Ref}
            value={textArea2Value}
            onChange={(e) => setTextArea2Value(e.target.value)}
            />

                <div className='flex items-center'>
                <textarea value={date} onChange={()=>{}} className='w-full bg-[#DFD7DA] focus:outline-none overflow-hidden resize-none my-1' type="text" rows="1" placeholder='Date'/>
                <button className='mr-2' onClick={handleUpdate}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                </button>
                <button onClick={handleDelete} className=''>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
                </button>
                </div>
   
        </div>

    </div>

  )
}

export default InputBox
