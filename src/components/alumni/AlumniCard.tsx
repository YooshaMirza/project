import React from 'react';
import { Link } from 'react-router-dom';
import { Alumni } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Card, CardContent } from '../ui/Card';
import { MapPin, Briefcase } from 'lucide-react';

interface AlumniCardProps {
  alumni: Alumni;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <Link to={`/alumni/${alumni.id}`}>
      <Card hoverable className="h-full transition-all hover:border-primary-200">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Avatar 
              src={alumni.avatar} 
              name={alumni.name} 
              size="lg" 
              className="mb-4"
            />
            
            <h3 className="text-lg font-semibold text-gray-900">
              {alumni.name}
            </h3>
            
            <p className="mt-1 text-sm text-gray-500">
              Batch of {alumni.batch} • {alumni.branch}
            </p>
            
            {alumni.jobTitle && alumni.company && (
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <Briefcase size={14} className="mr-1" />
                <span>{alumni.jobTitle} at {alumni.company}</span>
              </div>
            )}
            
            {alumni.location && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-1" />
                <span>{alumni.location}</span>
              </div>
            )}
            
            {alumni.skills && alumni.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-1">
                {alumni.skills.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700"
                  >
                    {skill}
                  </span>
                ))}
                {alumni.skills.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    +{alumni.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}