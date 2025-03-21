import { notFound } from "next/navigation";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PageProps {
    params: { id: string };
}

// ✅ Server-Side Fetching with Error Handling
export default async function PostDetails({ params }: PageProps) {
    const { id } = await params; // Ensure params is resolved properly
    if (!id) return notFound();

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            cache: "no-store",
        });

        if (!response.ok) return notFound();

        const post: Post = await response.json();

        return (
            <Container className="mt-4">
                <h1>{post.id}: {post.title}</h1>
                <p>{post.body}</p>
                <Link href="/" passHref>
                    <Button variant="secondary">Back to Blog</Button>
                </Link>
            </Container>
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        return notFound();
    }
}
