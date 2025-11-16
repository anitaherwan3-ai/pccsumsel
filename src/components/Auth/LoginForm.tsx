import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [idPetugas, setIdPetugas] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(idPetugas, password)) {
      toast.success("Login berhasil!");
      navigate("/admin/dashboard"); // Redirect to admin dashboard after successful login
    } else {
      toast.error("ID Petugas atau Password salah.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login Petugas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="idPetugas">ID Petugas</Label>
            <Input
              id="idPetugas"
              type="text"
              placeholder=""
              required
              value={idPetugas}
              onChange={(e) => setIdPetugas(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-primary-blue hover:bg-primary-blue/90">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;