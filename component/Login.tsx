"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import '../assets/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.data.token) {
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('username', user.username); 
        login(user.username); 

        router.push('/menu');
      } else {
        setError('Login gagal! Token tidak ditemukan.');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login gagal!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
          />
        </div>
        <div>
          <label className="text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div>
          <button
            type="submit"
            className="login"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </div>
      </form>
      <div className="regist">
        <Link href="/auth/register">
          <button className="register-button">Daftar disini</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
