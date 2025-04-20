import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export function SignupForm() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(name, email, password);
      navigate('/complete-profile');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during signup');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center rounded-md border border-error-200 bg-error-50 p-4 text-sm text-error-600">
          <AlertCircle size={16} className="mr-2 h-4 w-4" />
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        id="name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        leftIcon={<User size={16} />}
      />

      <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        leftIcon={<Mail size={16} />}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        leftIcon={<Lock size={16} />}
        helperText="Password must be at least 8 characters"
      />

      <Input
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        leftIcon={<Lock size={16} />}
      />

      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <Link to="/terms" className="font-medium text-primary-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="font-medium text-primary-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Create Account
      </Button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}