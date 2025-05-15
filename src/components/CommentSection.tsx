
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { HeartIcon, Reply } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection = ({ comments }: CommentSectionProps) => {
  const [likedComments, setLikedComments] = useState<number[]>([]);
  
  const handleLikeComment = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId));
    } else {
      setLikedComments([...likedComments, commentId]);
    }
  };
  
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-muted-foreground ml-2">{comment.date}</span>
                </div>
              </div>
              
              <p className="text-sm">{comment.content}</p>
              
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <HeartIcon 
                    className="h-4 w-4 mr-1" 
                    fill={likedComments.includes(comment.id) ? "currentColor" : "none"} 
                  />
                  <span>{comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <Reply className="h-4 w-4 mr-1" />
                  <span>Antworten</span>
                </Button>
              </div>
            </div>
          </div>
          
          <Separator />
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
