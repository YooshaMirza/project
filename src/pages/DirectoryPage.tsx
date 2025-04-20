import React, { useEffect } from 'react';
import { useAlumniStore } from '../store/alumniStore';
import { AlumniCard } from '../components/alumni/AlumniCard';
import { AlumniFilter } from '../components/alumni/AlumniFilter';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function DirectoryPage() {
  const { 
    alumni, 
    filteredAlumni, 
    isLoading, 
    searchQuery, 
    filters,
    fetchAlumni,
    updateSearchQuery,
    updateFilters,
    clearFilters
  } = useAlumniStore();
  
  useEffect(() => {
    if (alumni.length === 0) {
      fetchAlumni();
    }
  }, [alumni.length, fetchAlumni]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Alumni Directory
            </h1>
            
            <p className="mt-2 text-gray-600">
              Connect with fellow alumni from around the world
            </p>
          </div>
          
          <div className="mb-8">
            <AlumniFilter 
              onSearch={updateSearchQuery}
              onFilter={updateFilters}
              onClearFilters={clearFilters}
              searchQuery={searchQuery}
              currentFilters={filters}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600"></div>
            </div>
          ) : filteredAlumni.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAlumni.map((alumni) => (
                <AlumniCard key={alumni.id} alumni={alumni} />
              ))}
            </div>
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              
              <h2 className="text-xl font-semibold text-gray-700">
                No alumni found
              </h2>
              
              <p className="mt-2 text-gray-500">
                Try adjusting your search criteria or clearing filters
              </p>
              
              <button
                onClick={clearFilters}
                className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}