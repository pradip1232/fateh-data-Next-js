import { notFound } from "next/navigation";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
}

type PageProps = {
    params: {
        key: string;
        id: string;
    }
}

// const page = ({ params }: PageProps) => {
//     return (
//         <JobDescription id={params.jobdetail} />
//     )
// }

export default async function PostDetails({ params }: PageProps) {
    // console.log("Server Received params:", params);
    // console.log("Type of id:", typeof params.id);

    if (!params?.id) return notFound();

    const id = String(params?.id); // Ensure it's a string explicitly

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            cache: "no-store",
        });

        if (!response.ok) return notFound();

        const post = await response.json();

        return (
            <div>
                <h1>{post?.id}: {post?.title}</h1>
                <p>{post?.body}</p>
            </div>
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        return notFound();
    }
}
