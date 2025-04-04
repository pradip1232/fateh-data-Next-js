'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Container, Form, Card, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import NewPostForm from './components/NewPostForm';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from API
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));

    // Load local posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
    setLocalPosts(savedPosts);
  }, []);

  const handleNewPost = (newPost: Post) => {
    setLocalPosts(prev => [newPost, ...prev]);
  };

  const allPosts = [...localPosts, ...posts];
  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Container className="mt-4">
        <NewPostForm onNewPost={handleNewPost} />
        
        <div className="d-flex justify-content-end mb-3">
          <Form.Control
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-primary rounded-3 w-50"
            aria-label="Search posts"
          />
        </div>
        
        <Row>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
                >
                  <Card className="mb-3 shadow-sm border-0">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-primary text-truncate" title={post.title}>
                        {post.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {post.body.slice(0, 100)}...
                      </Card.Text>
                      <Link href={`/${post.id}`} className="mt-auto">
                        <Button variant="primary">
                          Read More
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">No posts found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
