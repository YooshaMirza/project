import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { usePostStore } from '../../store/postStore';
import { 
  Image, 
  Video, 
  Link, 
  Calendar,
  X 
} from 'lucide-react';

export function CreatePostForm() {
  const { user } = useAuthStore();
  const { createPost, isLoading } = usePostStore();
  
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    try {
      await createPost(content, tags.length > 0 ? tags : undefined, images.length > 0 ? images : undefined);
      
      // Reset form
      setContent('');
      setTags([]);
      setImages([]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleAddImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl('');
    }
  };
  
  const handleRemoveImage = (urlToRemove: string) => {
    setImages(images.filter(url => url !== urlToRemove));
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar 
            src={user?.avatar} 
            name={user?.name} 
            size="md"
          />
          
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 rounded-lg border border-gray-300 bg-white p-2 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
                <textarea
                  placeholder="Share something with the community..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  className="w-full resize-none border-0 bg-transparent p-2 text-gray-900 focus:outline-none focus:ring-0"
                />
                
                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5 border-t border-gray-200 px-2 pt-2">
                    {tags.map((tag, index) => (
                      <div 
                        key={index}
                        className="flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 text-primary-500 hover:text-primary-700"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="mb-2 grid gap-2 border-t border-gray-200 px-2 pt-2 sm:grid-cols-2">
                    {images.map((url, index) => (
                      <div key={index} className="group relative rounded-md overflow-hidden">
                        <img 
                          src={url} 
                          alt={`Attachment ${index + 1}`}
                          className="h-32 w-full object-cover"
                          onError={(e) => {
                            // Handle image load error
                            e.currentTarget.src = "https://images.pexels.com/photos/2395250/pexels-photo-2395250.jpeg?auto=compress&cs=tinysrgb&w=600";
                          }} 
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900/60 text-white opacity-0 transition-opacity hover:bg-gray-900/80 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Image URL */}
                <div className="flex gap-2 border-t border-gray-200 px-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddImage}
                    disabled={!imageUrl.trim()}
                  >
                    Add
                  </Button>
                </div>
                
                {/* Add Tags */}
                <div className="mt-2 flex gap-2 border-t border-gray-200 px-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    <Image size={16} className="text-primary-600" />
                    <span className="hidden sm:inline">Photo</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    <Video size={16} className="text-green-600" />
                    <span className="hidden sm:inline">Video</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    <Link size={16} className="text-blue-600" />
                    <span className="hidden sm:inline">Link</span>
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    <Calendar size={16} className="text-yellow-600" />
                    <span className="hidden sm:inline">Event</span>
                  </button>
                </div>
                
                <Button
                  type="submit"
                  disabled={!content.trim() || isLoading}
                  isLoading={isLoading}
                >
                  Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}