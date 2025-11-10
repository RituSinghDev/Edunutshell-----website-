"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogPost {
  _id: string;
  title: string;
  body: string;
  image?: string;
  tags?: string[];
  eventDate: string;
}

function BlogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  const getImageUrl = (url?: string) =>
    url && url.startsWith("http")
      ? url
      : "https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg";

  const handleCardClick = (post: BlogPost) => {
    const postDataString = encodeURIComponent(JSON.stringify(post));
    router.push(`/blog/${post._id}?data=${postDataString}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://edunutshell-lms.onrender.com/api/blogs/");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const observeElements = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    observeElements();
  }, [filteredPosts, observeElements]);

  // ✅ Filter + sort logic combined
  useEffect(() => {
    let posts = [...blogPosts];
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      posts = posts.filter((post) => {
        const tags = post.tags?.join(" ").toLowerCase() || "";
        return (
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query) ||
          tags.includes(query)
        );
      });
    }

    // ✅ Sorting logic with alphabetical options
    posts.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      } else if (sortOrder === "atoz") {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === "ztoa") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredPosts(posts);
  }, [searchQuery, blogPosts, sortOrder]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading blogs...
      </div>
    );

  fadeRefs.current = [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-4 sm:px-6 lg:px-8 fade-in mt-12 sm:mt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-600 text-white border-0">
            <TrendingUp className="w-4 h-4 mr-1" /> Trending Articles
          </Badge>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 opacity-0 translate-y-8 transition-all duration-700"
            ref={(el) => { fadeRefs.current[0] = el; }}
          >
            Discover Stories That
            <span className="block text-blue-300">Inspire & Educate</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-700 delay-150"
            ref={(el) => { fadeRefs.current[1] = el; }}
          >
            Explore our collection of expertly crafted articles covering
            technology, design, business, and more.
          </p>

          {/* ✅ Search bar fix for mobile */}
          <div
            className="max-w-2xl mx-auto relative opacity-0 translate-y-8 transition-all duration-700 delay-300 px-2"
            ref={(el) => { fadeRefs.current[2] = el; }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by title, body or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 sm:py-5 text-base sm:text-lg bg-blue-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-600 text-black placeholder:text-gray-500 w-full"
            />
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header + Dropdown */}
          <div
            className="flex flex-wrap items-center justify-between mb-10 gap-3 opacity-0 translate-y-8 transition-all duration-700 pb-5"
            ref={(el) => { fadeRefs.current[3] = el; }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <div className="relative">
              <select
                className="bg-blue-50 text-blue-800 border border-blue-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="atoz">A → Z (Title)</option>
                <option value="ztoa">Z → A (Title)</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Card
                key={post._id}
                ref={(el) => { fadeRefs.current[idx + 4] = el; }}
                className="overflow-hidden border border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer opacity-0 translate-y-1 transition-all duration-700"
                onClick={() => handleCardClick(post)}
              >
                <div className="relative w-full overflow-hidden aspect-[16/9] bg-gray-100 flex items-center justify-center">
                  {post.image ? (
                    <img
                      src={getImageUrl(post.image)}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.remove();
                        const parent = e.currentTarget.parentNode as HTMLElement;
                        if (parent) {
                          parent.innerHTML = `<div class='flex items-center justify-center w-full h-full text-gray-500 font-medium'>Image not available</div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 font-medium">
                      Image not available
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          className="bg-blue-100 text-blue-700 border-0 capitalize"
                        >
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700 border-0">
                        General
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {post.body}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex flex-col gap-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />{" "}
                      {new Date(post.eventDate).toLocaleDateString("en-IN")}
                    </span>
                    <div className="text-blue-600 text-sm flex items-center p-0 h-auto">
                      View Article
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform" />
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-gray-600 text-lg">
              No articles found. Try a different search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
