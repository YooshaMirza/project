import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAlumniStore } from '../store/alumniStore';
import { AlumniProfile } from '../components/alumni/AlumniProfile';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function AlumniProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { alumni, fetchAlumni, getAlumniById } = useAlumniStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      if (alumni.length === 0) {
        await fetchAlumni();
      }
      setIsLoading(false);
    }
    
    loadData();
  }, [alumni.length, fetchAlumni]);
  
  const alumniProfile = id ? getAlumniById(id) : undefined;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600"></div>
            </div>
          ) : alumniProfile ? (
            <AlumniProfile alumni={alumniProfile} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-20 text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mb-4 text-gray-400"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M12 14v0a8 8 0 0 0-8 8v0h16v0a8 8 0 0 0-8-8Z" />
              </svg>
              
              <h2 className="text-xl font-semibold text-gray-700">
                Alumni Not Found
              </h2>
              
              <p className="mt-2 text-gray-500">
                The alumni profile you're looking for doesn't exist or has been removed.
              </p>
              
              <button
                onClick={() => window.history.back()}
                className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}