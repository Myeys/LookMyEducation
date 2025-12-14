"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../assets/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!username || !email || !password || !confirmPassword) {
    setError('Semua field wajib diisi!');
    return;
  }

  if (!/^[a-zA-Z]{1,10}$/.test(username)) {
    setError('Username hanya boleh huruf dan maksimal 10 karakter!');
    return;
  }

  if (password !== confirmPassword) {
    setError('Password tidak cocok!');
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.post('/api/register', {
      username,
      email,
      password,
    });
    if (response.data.success) {
      router.push('/auth/login');
    }
  } catch (err) {
    setError(err.response?.data?.error || 'Registrasi gagal!');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="register-container">
      <h2 className="register-title">Register   
        <hr className="hr-regist"/></h2>
         {error && <p className="error-message">{error}</p>}
     
      <form onSubmit={handleSubmit} className="register-form">
        
        <div className="useremail">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
                placeholder="Masukkan username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="Masukkan email"
              />
            </div>
            
            <div className="login-link">
              <span>Sudah punya akun? </span>
              <Link href="/auth/login" className="login-link-text">
                Login
              </Link>
            </div>
        </div>

        <div className="userpass">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Masukkan password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Konfirmasi Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Konfirmasi password"
            />
          </div>
          <div className='regist-regist'>
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Daftar"}
          </button>
        </div>
        </div>
       
      </form>
    </div>
  );
};

export default Register;



