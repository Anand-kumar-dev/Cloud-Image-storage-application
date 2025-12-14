import { useRef, useState } from "react";
import beaver from "@/assets/beaver.svg";
import { Button } from "@/components/ui/button";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";


function Home() {

  const [data , setdata] = useState("")
   const inputRef = useRef(null);

  const handleUpload = async (event) => {
     const file = inputRef.current.files[0];
    if (!file) {
      alert("Select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
       console.log("send data")
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data); 
    setdata(Object.keys(data))
  };

  return ( 
  <>
  
    <input type="file" ref={inputRef}  />
    <button onClick={handleUpload}>send</button>
    <div>data:{data}</div>
 
  </>
  );
}



export default Home;
