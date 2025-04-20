import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, Comment } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Calendar,
  Send
} from 'lucide-react';
import { usePostStore } from '../../store/postStore';
import { formatDate } from '../../lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { fetchComments, toggleLike, addComment } = usePostStore();
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setIsCommentsLoading(true);
      const fetchedComments = await fetchComments(post.id);
      setComments(fetchedComments);
      setIsCommentsLoading(false);
    }
    
    setShowComments(!showComments);
  };
  
  const handleLike = () => {
    toggleLike(post.id);
  };
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    await addComment(post.id, commentText);
    setCommentText('');
    
    // Refresh comments
    const fetchedComments = await fetchComments(post.id);
    setComments(fetchedComments);
  };
  
  return (
    <Card className="overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to={`/alumni/${post.author.id}`}>
            <Avatar 
              src={post.author.avatar} 
              name={post.author.name} 
              size="md" 
              className="mr-3"
            />
          </Link>
          
          <div>
            <Link 
              to={`/alumni/${post.author.id}`}
              className="font-medium text-gray-900 hover:text-primary-600"
            >
              {post.author.name}
            </Link>
            
            <div className="flex items-center text-xs text-gray-500">
              <span>
                {post.author.batch && `${post.author.batch} • `}
                {post.author.jobTitle}
              </span>
              <span className="mx-1.5">•</span>
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      {/* Post Content */}
      <CardContent className="px-4 pb-3 pt-0">
        <p className="whitespace-pre-line text-gray-800">{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className="mt-3 overflow-hidden rounded-md">
            <img 
              src={post.images[0]} 
              alt="Post attachment" 
              className="w-full object-cover"
            />
          </div>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      {/* Post Stats */}
      <div className="border-t border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            <span>{post.likes} likes</span>
          </div>
          
          <div>
            <button 
              className="hover:text-primary-600"
              onClick={handleToggleComments}
            >
              {post.comments} comments
            </button>
          </div>
        </div>
      </div>
      
      {/* Post Actions */}
      <CardFooter className="flex justify-between p-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`flex-1 ${post.hasLiked ? 'text-primary-600' : ''}`}
          leftIcon={<ThumbsUp size={18} />}
          onClick={handleLike}
        >
          Like
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="flex-1"
          leftIcon={<MessageCircle size={18} />}
          onClick={handleToggleComments}
        >
          Comment
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="flex-1"
          leftIcon={<Share2 size={18} />}
        >
          Share
        </Button>
      </CardFooter>
      
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-4 flex">
            <Avatar 
              size="sm" 
              className="mr-2"
            />
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-700"
                disabled={!commentText.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
          
          {/* Comments List */}
          {isCommentsLoading ? (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600"></div>
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex">
                  <Avatar 
                    src={comment.author.avatar} 
                    name={comment.author.name} 
                    size="sm" 
                    className="mr-2 mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <div className="mb-1 font-medium text-gray-900">
                        {comment.author.name}
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    
                    <div className="mt-1 flex gap-4 pl-3 text-xs text-gray-500">
                      <button className="hover:text-primary-600">Like</button>
                      <button className="hover:text-primary-600">Reply</button>
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      )}
    </Card>
  );
}