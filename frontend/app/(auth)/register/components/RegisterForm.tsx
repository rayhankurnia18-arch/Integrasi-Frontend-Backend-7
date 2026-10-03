'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Reset pesan sebelumnya
    setError('');
    setSuccess('');

    // Validasi field kosong
    if (
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Semua bidang wajib diisi!');
      return;
    }

    // Validasi email
    if (!email.includes('@')) {
      setError('Format email tidak valid!');
      return;
    }

    // Validasi password
    if (password.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      setError(
        'Password dan konfirmasi password tidak cocok!'
      );
      return;
    }

    try {
      setLoading(true);

      // Panggil service register
      await authService.register({
        username: username.trim(),
        email: email.trim(),
        password: password,
      });

      // Tampilkan pesan berhasil
      setSuccess(
        'Registrasi berhasil. Mengalihkan ke halaman login...'
      );

      // Redirect ke login
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal registrasi akun, coba username atau email lain!';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Pesan Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {error}
        </div>
      )}

      {/* Pesan Success */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
          {success}
        </div>
      )}

      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>

        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          placeholder="Masukkan username"
          required
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Masukkan email"
          required
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Masukkan password"
          required
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Konfirmasi Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Konfirmasi Password
        </label>

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Ulangi password"
          required
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Tombol Register */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading
          ? 'Memproses...'
          : 'Register'}
      </button>

      {/* Link ke Login */}
      <div className="text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
        >
          Login di sini
        </Link>
      </div>
    </form>
  );
}
