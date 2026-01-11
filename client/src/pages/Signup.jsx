import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useApi } from "@/hooks/Apihooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

function Signup() {
  const strings = "Sign in to imaze";
  const { request, loading, error } = useApi();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", pass);
    if (avatar) formData.append("avatar", avatar);

    const response = await request({
      url: "/auth/signup",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setEmail("");
    setPass("");
    setUsername("");
    setAvatar(null);

    toast.success(response.mes);
  };

  useEffect(() => {
    if (!error) return;

    if (error.response?.status === 401)
      return toast.error(error.response?.data?.mes || "Unauthorized");

    if (error.response?.status === 500)
      return toast.error(error.response?.data?.mes || "Server error");

    toast.error("Something went wrong");
  }, [error]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex justify-center items-center text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-2 tracking-tight">
          {Array.from(strings).map((letter, index) =>
            letter === " " ? (
              <span key={index}>&nbsp;</span>
            ) : (
              <span
                key={index}
                className="inline-block transition hover:text-yellow-400"
              >
                {letter}
              </span>
            )
          )}
        </h2>

        <p className="text-center text-sm text-neutral-400 mb-6">
          Create your account to get started
        </p>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/40 border-white/10 text-white"
          />

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black/40 border-white/10 text-white"
          />

          <Input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="bg-black/40 border-white/10 text-white"
          />

          {/* Avatar Upload */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="bg-black/40 border-white/10 text-white file:text-neutral-300"
          />

          <Button
            size="lg"
            onClick={handleSubmit}
            className="mt-2 rounded-xl bg-white text-black hover:bg-neutral-200 transition"
          >
            {loading ? <Spinner /> : "Sign Up"}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:underline hover:text-yellow-400 transition"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
