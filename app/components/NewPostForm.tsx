'use client';

import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface NewPostFormProps {
  onNewPost: (post: Post) => void;
}

export default function NewPostForm({ onNewPost }: NewPostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Post = {
      id: Date.now(),
      title,
      body,
    };

    // Save to local storage
    const savedPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
    localStorage.setItem('localPosts', JSON.stringify([newPost, ...savedPosts]));

    // Update parent component
    onNewPost(newPost);

    // Reset form
    setTitle('');
    setBody('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Create New Post</h5>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Cancel' : 'New Post'}
            </Button>
          </div>

          {isExpanded && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="post-title">Title</Form.Label>
                <Form.Control
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  aria-required="true"
                  placeholder="Enter post title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="post-body">Content</Form.Label>
                <Form.Control
                  id="post-body"
                  as="textarea"
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  aria-required="true"
                  placeholder="Write your post content here..."
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Publish Post
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
} 