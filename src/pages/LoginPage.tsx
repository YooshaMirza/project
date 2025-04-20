import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>
            
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <LoginForm />
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}