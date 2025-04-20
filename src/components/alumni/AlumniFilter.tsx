import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, Filter, X } from 'lucide-react';

interface AlumniFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Partial<SearchFilters>) => void;
  onClearFilters: () => void;
  searchQuery: string;
  currentFilters: SearchFilters;
}

// Sample data for dropdowns
const BATCH_YEARS = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
const BRANCHES = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Chemical Engineering', 'Civil Engineering'];
const LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Boston, MA', 'Los Angeles, CA'];
const JOB_TITLES = ['Software Engineer', 'Data Scientist', 'Product Manager', 'Mechanical Engineer', 'Electrical Engineer'];

export function AlumniFilter({ 
  onSearch, 
  onFilter, 
  onClearFilters,
  searchQuery,
  currentFilters 
}: AlumniFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>(currentFilters);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const applyFilters = () => {
    onFilter(localFilters);
    setIsFilterOpen(false);
  };
  
  const clearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };
  
  const hasActiveFilters = Object.values(currentFilters).some(value => 
    value !== undefined && (typeof value === 'string' ? value.length > 0 : value.length > 0)
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search alumni by name, batch, branch..."
          value={searchQuery}
          onChange={handleSearchChange}
          leftIcon={<Search size={16} />}
          className="flex-grow"
        />
        
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          leftIcon={<Filter size={16} />}
          className="sm:w-auto"
        >
          Filter
          {hasActiveFilters && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
              {Object.keys(currentFilters).filter(key => 
                currentFilters[key as keyof SearchFilters] !== undefined
              ).length}
            </span>
          )}
        </Button>
      </div>
      
      {isFilterOpen && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Batch
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={localFilters.batch || ''}
                onChange={(e) => handleFilterChange('batch', e.target.value)}
              >
                <option value="">All Batches</option>
                {BATCH_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Branch
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={localFilters.branch || ''}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
              >
                <option value="">All Branches</option>
                {BRANCHES.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={localFilters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={localFilters.jobTitle || ''}
                onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
              >
                <option value="">All Job Titles</option>
                {JOB_TITLES.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(currentFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) {
              return null;
            }
            
            return (
              <div 
                key={key}
                className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                <span className="mr-1 font-medium">{key}:</span>
                <span>{value}</span>
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    const newFilters = { ...currentFilters };
                    delete newFilters[key as keyof SearchFilters];
                    onFilter(newFilters);
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
          
          <button
            className="text-sm text-primary-600 hover:text-primary-700"
            onClick={onClearFilters}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}