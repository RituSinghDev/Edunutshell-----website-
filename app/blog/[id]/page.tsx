"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  body: string;
  image?: string;
  tags?: string[];
  eventDate: string;
  author?: string;
}

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const searchParams = useSearchParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Get post data from URL params first, then try to fetch from API
  useEffect(() => {
    const postDataString = searchParams.get("data");
    if (postDataString) {
      // Use the data passed from the main blog page
      try {
        const postData = JSON.parse(decodeURIComponent(postDataString));
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing post data:", error);
        // If parsing fails, fetch from API using the ID
        fetchPostById(params.id);
      }
    } else {
      // If no data in URL, fetch from API
      fetchPostById(params.id);
    }
  }, [searchParams, params.id]);

  const fetchPostById = async (id: string) => {
    try {
      const res = await fetch(`https://edunutshell-lms.onrender.com/api/blogs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog post");
      const data = await res.json();
      setPost(data);
    } catch (err) {
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url?: string) =>
    url && url.startsWith("http")
      ? url
      : "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-600">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </nav>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag, idx) => (
              <Badge
                key={idx}
                className="bg-blue-100 text-blue-700 border-0 capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.eventDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Optional: Add author if available */}
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}

            {/* Optional: Add reading time estimate */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(post.body?.length / 1000) || 5} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={getImageUrl(post.image)}
              alt={post.title}
              className="w-full h-auto max-h-96 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {/* If your body is HTML content */}
          {post.body && post.body.includes("<") && (
            <div
              className="text-gray-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

          {/* If your body is plain text */}
          {post.body && !post.body.includes("<") && (
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {post.body}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-gray-600 capitalize">
                #{tag}
              </Badge>
            ))}
          </div>

          <Link href="/blog">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  );
}
