import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import mainImg from "@/assets/img/main.jpg";
import logo from "@/assets/img/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={mainImg} 
          alt="Campus" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="EduSync" className="h-12 w-12 rounded-xl object-cover" />
            <span className="text-3xl font-bold">EduSync</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-white/80 max-w-md">
            Access your academic information, attendance, performance, and more all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <img src={logo} alt="EduSync" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-2xl font-bold">EduSync</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Login</h2>
          <p className="text-gray-500 mb-8">Enter your credentials to access your portal</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@chitkara.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-11"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-11"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
            )}
            
            <Button type="submit" className="w-full h-11 text-base font-medium">
              Login
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Contact your administrator for login credentials
          </p>
        </div>
      </div>
    </div>
  );
}
