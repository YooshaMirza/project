import React from 'react';
import { Alumni } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Award, 
  Linkedin, 
  Github, 
  Globe, 
  Mail
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface AlumniProfileProps {
  alumni: Alumni;
}

export function AlumniProfile({ alumni }: AlumniProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <Avatar 
                src={alumni.avatar} 
                name={alumni.name} 
                size="xl" 
                className="mb-4 md:mb-0 md:mr-6"
              />
              
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {alumni.name}
                </h1>
                
                <p className="mt-1 text-lg text-gray-500">
                  {alumni.batch} • {alumni.branch}
                </p>
                
                {alumni.jobTitle && alumni.company && (
                  <div className="mt-2 flex items-center justify-center text-gray-600 md:justify-start">
                    <Briefcase size={16} className="mr-1.5" />
                    <span>{alumni.jobTitle} at {alumni.company}</span>
                  </div>
                )}
                
                {alumni.location && (
                  <div className="mt-1.5 flex items-center justify-center text-gray-600 md:justify-start">
                    <MapPin size={16} className="mr-1.5" />
                    <span>{alumni.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
              <Button leftIcon={<Mail size={16} />}>
                Contact
              </Button>
              <Button variant="outline" leftIcon={<Linkedin size={16} />}>
                Connect
              </Button>
            </div>
          </div>
          
          {/* Social Links */}
          {(alumni.linkedin || alumni.github || alumni.website) && (
            <div className="mt-6 flex justify-center gap-4 md:justify-start">
              {alumni.linkedin && (
                <a 
                  href={alumni.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-500 hover:text-primary-600"
                >
                  <Linkedin size={18} className="mr-1.5" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              
              {alumni.github && (
                <a 
                  href={alumni.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-500 hover:text-primary-600"
                >
                  <Github size={18} className="mr-1.5" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              
              {alumni.website && (
                <a 
                  href={alumni.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-500 hover:text-primary-600"
                >
                  <Globe size={18} className="mr-1.5" />
                  <span className="text-sm">Website</span>
                </a>
              )}
            </div>
          )}
          
          {/* Skills */}
          {alumni.skills && alumni.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {alumni.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Bio */}
          {alumni.bio && (
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
                About
              </h3>
              <p className="text-gray-600">
                {alumni.bio}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Experience */}
      {alumni.experience && alumni.experience.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Professional Experience
            </h2>
            
            <div className="space-y-6">
              {alumni.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start">
                    <div 
                      className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                    >
                      <Briefcase size={16} className="text-gray-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      
                      <div className="mt-1 text-sm text-gray-600">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        <span>
                          {new Date(exp.startDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                          {' - '}
                          {exp.current 
                            ? 'Present'
                            : new Date(exp.endDate!).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              })
                          }
                        </span>
                      </div>
                      
                      {exp.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Education */}
      {alumni.education && alumni.education.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Education
            </h2>
            
            <div className="space-y-6">
              {alumni.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start">
                    <div 
                      className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                    >
                      <GraduationCap size={16} className="text-gray-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.institution}
                      </h3>
                      
                      <div className="mt-1 text-sm text-gray-600">
                        {edu.degree} in {edu.field}
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        <span>
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                      
                      {edu.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Achievements */}
      {alumni.achievements && alumni.achievements.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Achievements
            </h2>
            
            <div className="space-y-6">
              {alumni.achievements.map((achievement) => (
                <div key={achievement.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start">
                    <div 
                      className="mr-4 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                    >
                      <Award size={16} className="text-gray-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {achievement.title}
                      </h3>
                      
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        <span>{formatDate(achievement.date)}</span>
                      </div>
                      
                      {achievement.description && (
                        <p className="mt-2 text-sm text-gray-600">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}