import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { logout } from '@/feature/auth/auth.Slice'
import { useApi } from '@/hooks/Apihooks'
import { getAvatarUrl } from '@/services/cloudinary'
import { addImage, deleteImage } from '@/services/media'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { data, Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

function Dash(medias = { media }) {

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


  const handleAddImage = async () => {
    const fileObj = file.current?.files?.[0];

    await addImage({
      request,
      fileObj,
      onSuccess: () => setimageupdate(prev => prev + 1),
    });
  };


  const handleDeleteImage = async (imageId, type) => {
    await deleteImage({
      request,
      imageId,
      type,
      onSuccess: () => setimageupdate(prev => prev + 1),
    });
  };

  return (
    <>
      {/* Page wrapper */}
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white p-6">

        {/* Header */}
        <div className="mb-8 flex justify-between sticky top-3 z-99 items-center border border-white/20 p-3 bg-white/10 backdrop-blur-xl shadow-2xl  rounded-2xl">
          <div>
            <h1 className="flex items-center gap-4 text-4xl font-semibold tracking-tight">
              {/* Avatar */}
              {user.avatar ? (
                <div className="relative">
                  <img
                    src={getAvatarUrl(user.avatar, 48)}
                    alt={user.username}
                    className="w-12 h-12 rounded-full border border-white/20 shadow-md 
                   transition-transform duration-200 hover:scale-105"
                  />
                  {/* subtle glow */}
                  <span className="absolute inset-0 rounded-full ring-2 ring-yellow-500/30"></span>
                </div>
              ) : (
                <div className="w-12 h-12 flex items-center justify-center rounded-full 
                    bg-gradient-to-br from-yellow-500 to-amber-600 
                    text-black font-bold text-lg shadow-md">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              )}

              {/* Username */}
              <span className="flex items-center gap-2">
                <span className="text-white">{user.username}</span>
              </span>
            </h1>

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
                <Link
                  key={data.id}
                  to={`/media/${data.id}`}
                  state={{ medias: media?.media }}
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteImage(data.id, data.type)
                      }}
                      className="bg-red-600/90 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </Link>
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
            onClick={handleAddImage}
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