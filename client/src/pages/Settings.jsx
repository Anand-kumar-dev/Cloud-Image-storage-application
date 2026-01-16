import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useApi } from "@/hooks/Apihooks";
import { getAvatarUrl } from "@/services/cloudinary";
import { logout, setUser } from "@/feature/auth/auth.Slice";
import { ArrowLeft, Trash2, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, error } = useApi();
  const { user } = useSelector((state) => state.auth);

  const avatarRef = useRef(null);

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingAvatarDelete, setLoadingAvatarDelete] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (error) {
      if (error.response?.status === 401) {
        dispatch(logout());
        navigate("/login");
      }
      toast.error(error.response?.data?.mes || "Something went wrong");
    }
  }, [error]);


  const handleProfileUpdate = async () => {
    setLoadingProfile(true);
    if ( form.username == user.username && form.email == user.email) {
      toast.error("change something to update profile");
      setLoadingProfile(false);
      return;
    }
    try {
      const res = await request({
        url: "/settings/profile",
        method: "PATCH",
        data: {
          username: form.username,
          email: form.email,
        },
      });

      if (res?.data) {
        dispatch(setUser(res.data));
        toast.success("Profile updated");
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!form.oldPassword || !form.newPassword)
      return toast.error("Fill all password fields");

    setLoadingPassword(true);
    try {
      const res = await request({
        url: "/settings/password",
        method: "PATCH",
        data: {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
      });

      if (res?.mes) {
        toast.success(res.mes);
        setForm({ ...form, oldPassword: "", newPassword: "" });
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleAvatarUpdate = async () => {
    console.log("avatarRef.current =", avatarRef.current);
    const file = avatarRef.current?.files?.[0];
    if (!file) return toast.error("Select an image");



    setLoadingAvatar(true);
    try {
      const fd = new FormData();
      fd.append("avatar", file);

      const res = await request({
        url: "/settings/avatar",
        method: "PATCH",
        data: fd,
      });

      if (res?.avatar) {
        dispatch(setUser({ ...user, avatar: res.avatar }));
        toast.success("Avatar updated");
      }
    } finally {
      setAvatarPreview(null)
      setLoadingAvatar(false);
    }
  };

  const handleAvatarDelete = async () => {
    setLoadingAvatarDelete(true);
    try {
      const res = await request({
        url: "/settings/avatar",
        method: "DELETE",
      });

      if (res?.mes) {
        dispatch(setUser({ ...user, avatar: null }));
        toast.success("Avatar removed");
      }
    } finally {
      setLoadingAvatarDelete(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-14">
        <div className="flex items-center gap-4">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer text-neutral-500 hover:text-white transition"
          />
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
            <p className="text-neutral-500 mt-1">
              Edit your profile and account security
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* LEFT — BIG AVATAR */}
        <div className="flex flex-col items-start gap-8">

          {/* Avatar */}
          <div className="relative group">
            <div className="w-40 h-40 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
              {user?.avatar ? (
                <img
                  src={getAvatarUrl(user.avatar, 160)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-neutral-400">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            {user?.avatar && (
              <button
                onClick={handleAvatarDelete}
                disabled={loadingAvatarDelete}
                className="
              absolute -bottom-3 -right-3
              bg-red-600 hover:bg-red-700
              p-3 rounded-full
              shadow-xl
              transition
              opacity-0 group-hover:opacity-100
            "
              >
                {loadingAvatarDelete ? <Spinner size={16} /> : <Trash2 size={16} />}
              </button>
            )}
          </div>

          {/* Avatar Controls */}
          <div className="w-full max-w-xs flex flex-col gap-4">

            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const previewUrl = URL.createObjectURL(file);
                  setAvatarPreview(previewUrl);
                }
                
              }}
            />

            {/* Preview */}
            {avatarPreview && (
              <div className="
            w-full h-40 rounded-2xl overflow-hidden
            border border-dashed border-neutral-700
            bg-neutral-900
            relative
            animate-preview-grow
          ">
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="
              absolute top-3 left-3
              text-xs uppercase tracking-wider
              bg-neutral-800 text-neutral-300
              px-3 py-1 rounded-full
            ">
                  Preview
                </span>
              </div>
            )}

            <button
              onClick={() => {
                console.log("click fired");
                avatarRef.current?.click();
              }}
              type="button"
              className="
            w-full px-4 py-3 rounded-xl
            border border-neutral-700
            text-left
            hover:border-neutral-500
            transition
          "
            >
              Choose new photo
            </button>

            <button
              onClick={handleAvatarUpdate}
              disabled={!avatarPreview || loadingAvatar}
              className="
            w-full px-4 py-3 rounded-xl
            bg-white text-black
            font-medium
            disabled:opacity-40
            transition
          "
            >
              {loadingAvatar ? <Spinner /> : "Save photo"}
            </button>

          </div>
        </div>

        {/* RIGHT — FORMS */}
        <div className="lg:col-span-2 space-y-14">

          {/* Account Info */}
          <section>
            <h2 className="text-xl font-medium mb-6">Account information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                className="
              bg-neutral-900 border border-neutral-800
              rounded-xl px-4 py-3
              focus:outline-none focus:border-neutral-500
            "
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <input
                className="
              bg-neutral-900 border border-neutral-800
              rounded-xl px-4 py-3
              focus:outline-none focus:border-neutral-500
            "
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handleProfileUpdate}
                disabled={loadingProfile}
                className="
              px-6 py-3 rounded-xl
              bg-neutral-800 hover:bg-neutral-700
              transition
            "
              >
                {loadingProfile ? <Spinner /> : "Update profile"}
              </button>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-medium mb-6">Security</h2>

            <div className="max-w-md space-y-6">
              <input
                type="password"
                className="
              w-full bg-neutral-900 border border-neutral-800
              rounded-xl px-4 py-3
              focus:outline-none focus:border-neutral-500
            "
                placeholder="Current password"
                value={form.oldPassword}
                onChange={(e) =>
                  setForm({ ...form, oldPassword: e.target.value })
                }
              />
              <input
                type="password"
                className="
              w-full bg-neutral-900 border border-neutral-800
              rounded-xl px-4 py-3
              focus:outline-none focus:border-neutral-500
            "
                placeholder="New password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />

              <button
                onClick={handlePasswordChange}
                disabled={loadingPassword}
                className="
              w-full px-6 py-3 rounded-xl
              bg-neutral-800 hover:bg-neutral-700
              transition
            "
              >
                {loadingPassword ? <Spinner /> : "Change password"}
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>


  );
}

export default SettingsPage;
