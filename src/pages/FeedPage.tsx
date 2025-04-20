import React, { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import { PostCard } from '../components/feed/PostCard';
import { CreatePostForm } from '../components/feed/CreatePostForm';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function FeedPage() {
  const { posts, isLoading, fetchPosts } = usePostStore();
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Community Feed
            </h1>
            
            <p className="mt-2 text-gray-600">
              Stay updated with the latest news and activities from your alumni community
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <CreatePostForm />
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600"></div>
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-center">
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
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 11h10" />
                    <path d="M7 15h4" />
                  </svg>
                  
                  <h2 className="text-xl font-semibold text-gray-700">
                    No posts yet
                  </h2>
                  
                  <p className="mt-2 text-gray-500">
                    Be the first to share something with the community
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Upcoming Events
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <span className="text-xs font-medium">AUG</span>
                      <span className="text-lg font-bold">24</span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Annual Alumni Meetup
                      </h3>
                      <p className="text-sm text-gray-500">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <span className="text-xs font-medium">SEP</span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Career Development Workshop
                      </h3>
                      <p className="text-sm text-gray-500">
                        Virtual Event
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <span className="text-xs font-medium">OCT</span>
                      <span className="text-lg font-bold">10</span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Homecoming Weekend
                      </h3>
                      <p className="text-sm text-gray-500">
                        University Campus
                      </p>
                    </div>
                  </div>
                </div>
                
                <a
                  href="/events"
                  className="mt-4 block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View All Events
                </a>
              </div>
              
              {/* Popular Tags */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Popular Tags
                </h2>
                
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #careers
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #networking
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #events
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #jobopportunities
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #reunion
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #mentorship
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #tech
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    #research
                  </span>
                </div>
              </div>
              
              {/* Suggested Connections */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Suggested Connections
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150" 
                        alt="Alumni" 
                        className="mr-3 h-10 w-10 rounded-full object-cover"
                      />
                      
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Emma Wilson
                        </h3>
                        <p className="text-xs text-gray-500">
                          Product Manager at Google
                        </p>
                      </div>
                    </div>
                    
                    <button className="rounded-full border border-primary-600 px-3 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" 
                        alt="Alumni" 
                        className="mr-3 h-10 w-10 rounded-full object-cover"
                      />
                      
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Jason Lee
                        </h3>
                        <p className="text-xs text-gray-500">
                          Data Scientist at Tesla
                        </p>
                      </div>
                    </div>
                    
                    <button className="rounded-full border border-primary-600 px-3 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150" 
                        alt="Alumni" 
                        className="mr-3 h-10 w-10 rounded-full object-cover"
                      />
                      
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Sophia Martinez
                        </h3>
                        <p className="text-xs text-gray-500">
                          UI/UX Designer at Adobe
                        </p>
                      </div>
                    </div>
                    
                    <button className="rounded-full border border-primary-600 px-3 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50">
                      Connect
                    </button>
                  </div>
                </div>
                
                <a
                  href="/directory"
                  className="mt-4 block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Find More Connections
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}