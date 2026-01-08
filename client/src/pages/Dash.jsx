import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { logout } from '@/feature/auth/auth.Slice'
import { useApi } from '@/hooks/Apihooks'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { data , useNavigate } from 'react-router'
import { toast } from 'sonner'

function Dash() {

  const navigate = useNavigate()

  const { request, loading, error } = useApi();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [media, setmedia] = useState();
  const [imageupdate, setimageupdate] = useState(0)
  const file = useRef(null)


  const handleSubmit = async () => {
    const response = await request({ url: "/auth/logout", method: "GET" })
    dispatch(logout());
    if (response.ok) return toast.success("log out successfully")
  };




  useEffect(() => {
    if (error) {
      if (error.response?.status == 401) return dispatch(logout())
      if (error.response?.status == 500) return toast.error(error.response?.data?.mes || error.response?.data?.error)
      toast(error.response?.data?.mes)
    }
  }, [error]);



  useEffect(() => {
    (async () => {
      const response = await request({ url: "/api/fetch", method: "POST" });
      setmedia(response.data);
      console.log(`fetch data ${JSON.stringify(response)}`)
    })()
  }, [imageupdate])


  const addImage = async () => {
    try {
      const fileObj = file.current?.files?.[0]
      if (!fileObj) {
        toast.error("Please select a file")
        return
      }
      const formData = new FormData()
      formData.append("file", fileObj)

      const response = await request({ url: "/api/upload", method: 'POST', data: formData })
      console.log(response)

      if (response?.data || typeof response === "string") {
        toast.success("images added successfully");
        setimageupdate(prev => prev + 1);
      }
    } catch (error) {
      console.log(error)
    }
  }


  const deleteImage = async (imageid , type) => {
    try {
      const response = await request({ url: "/api/delete", method: "POST", data: { _id: imageid ,type :type} })
      console.log(response);
      if (response?.data) {
        setimageupdate(prev => prev + 1)
        toast.success(response.data.result + "from backend")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message || "something wrong while delting")
    }
  }

  return (
  <>
    {/* Page wrapper */}
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white p-6">

      {/* Header */}
      <div className="mb-8 flex justify-between sticky top-3 z-99 items-center border border-white/20 p-3 bg-white/10 backdrop-blur-xl shadow-2xl  rounded-2xl">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-neutral-400 mt-1">Manage your media & account</p>
        </div>
         <Button
          onClick={handleSubmit}
          className="rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 ml-auto"
        >
          {loading ? <Spinner /> : "Log out"}
        </Button>
      </div>
      

      {/* User Info Card */}
      <div className="mb-8 max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
        <h2 className="text-xl font-medium mb-4 text-neutral-200">User Info</h2>

        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(user).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between rounded-lg bg-black/40 px-4 py-2"
              >
                <span className="text-neutral-400">{key}</span>
                <span className="text-neutral-200 truncate max-w-[150px]">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-500">No user info</div>
        )}
      </div>

      {/* Media Section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium mb-4 text-neutral-200">Your Media</h2>

        {media == null ? (
          <div className="text-neutral-500">No media found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.media.map((data) => (
              <div
                key={data.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:border-white/20 transition"
              >
                {data.type === "video" ? (
                  <video
                    className="w-full h-64 object-cover"
                    src={data.url}
                    controls
                  />
                ) : (
                  <img
                    className="w-full h-64 object-cover"
                    src={data.url}
                    alt=""
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-end p-4">
                  <button
                    onClick={() => deleteImage(data.id, data.type)}
                    className="bg-red-600/90 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

        <label className="relative cursor-pointer">
          <input
            ref={file}
            type="file"
            className="hidden"
          />
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 transition">
            Upload Media
          </div>
        </label>

        <Button
          onClick={addImage}
          className="rounded-xl bg-white text-black hover:bg-neutral-200 px-6 py-3"
        >
          Add
        </Button>

        
      </div>
    </div>
  </>
)

}

export default Dash