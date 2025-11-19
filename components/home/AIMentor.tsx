"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  Paperclip,
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Calendar,
  MessageCircle,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`; // reset first
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

export default function AIMentor() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });

  const fullText = "Designed to think with you";

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    const typeInterval = setInterval(() => {
      if (isPaused) return;

      if (!isDeleting) {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
          if (currentIndex > fullText.length) {
            setShowCursor(false);
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
              isDeleting = true;
              setShowCursor(true);
            }, 4000);
          }
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
          setDisplayedText(fullText.slice(0, currentIndex));
        } else {
          isDeleting = false;
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, []);







  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Build context from previous messages (excluding the current one)
      const context = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        content: msg.content
      }));

      const response = await fetch("https://edunutshell-lms.onrender.com/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: context
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      return data.reply || "I'm sorry, I couldn't process that request. Please try again.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    
    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    adjustHeight(true);
    setIsLoading(true);

    // Get AI response
    const aiResponse = await getAIResponse(userMessage);
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = async (label: string) => {
    if (isLoading) return;
    
    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: label }]);
    setIsLoading(true);
    
    // Get AI response
    const aiResponse = await getAIResponse(label);
    setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div
      className="relative w-full min-h-[600px] bg-cover bg-center flex flex-col items-center py-8 md:py-12 px-4"
      style={{
        backgroundImage:
          "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png')",
      }}
    >
      {/* Centered AI Title */}
      <div className="w-full flex flex-col items-center justify-center mb-6 md:mb-8">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-sm min-h-[2rem] md:min-h-[3rem]">
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
          </h1>
          <p className="mt-2 text-sm md:text-base text-neutral-200">
            Build something amazing — just start typing below.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl flex flex-col mb-4">
        <div className={cn(
          "bg-black/80 rounded-xl border border-neutral-700 flex flex-col",
          messages.length === 0 ? "h-auto" : "h-[500px] md:h-[600px]"
        )}>
          {/* Chat Display Area - Only show when there are messages */}
          {messages.length > 0 && (
            <div 
              ref={chatContainerRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 scroll-smooth"
              style={{ overscrollBehavior: 'contain' }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] md:max-w-[80%] rounded-lg px-3 py-2 md:px-4 text-sm md:text-base leading-relaxed",
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 shadow-md"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <FormattedMessage content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] md:max-w-[80%] rounded-lg px-3 py-2 md:px-4 text-sm md:text-base bg-white text-gray-900">
                    <div className="flex items-center gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Typing Area */}
          <div className={cn(messages.length > 0 && "border-t border-neutral-700")}>
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your request..."
              className={cn(
                "w-full px-3 md:px-4 py-3 resize-none border-none",
                "bg-transparent text-white text-sm",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-neutral-400 min-h-[48px]"
              )}
              style={{ overflow: "auto" }}
            />

            {/* Footer Buttons */}
            <div className="flex items-center justify-between p-2 md:p-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-neutral-700"
              >
                <Paperclip className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || isLoading}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg",
                    message.trim() && !isLoading
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  )}
                >
                  <ArrowUpIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Below Chat Container */}
        <div className="flex items-center justify-start flex-wrap gap-2 md:gap-3 mt-4">
          <QuickAction 
            icon={<BookOpen className="w-3 h-3 md:w-4 md:h-4" />} 
            label="How many courses are there?" 
            onClick={() => handleQuickAction("How many courses are there?")}
          />
          <QuickAction 
            icon={<GraduationCap className="w-3 h-3 md:w-4 md:h-4" />} 
            label="I'm a CSE student, which course do you suggest?" 
            onClick={() => handleQuickAction("I'm a CSE student, which course do you suggest?")}
          />
          <QuickAction 
            icon={<TrendingUp className="w-3 h-3 md:w-4 md:h-4" />} 
            label="What are the most popular courses?" 
            onClick={() => handleQuickAction("What are the most popular courses?")}
          />
          <QuickAction 
            icon={<Award className="w-3 h-3 md:w-4 md:h-4" />} 
            label="Do you offer certifications?" 
            onClick={() => handleQuickAction("Do you offer certifications?")}
          />
          <QuickAction 
            icon={<Calendar className="w-3 h-3 md:w-4 md:h-4" />} 
            label="What is the course duration?" 
            onClick={() => handleQuickAction("What is the course duration?")}
          />
          <QuickAction 
            icon={<Users className="w-3 h-3 md:w-4 md:h-4" />} 
            label="Tell me about the instructors" 
            onClick={() => handleQuickAction("Tell me about the instructors")}
          />
          <QuickAction 
            icon={<MessageCircle className="w-3 h-3 md:w-4 md:h-4" />} 
            label="How can I contact support?" 
            onClick={() => handleQuickAction("How can I contact support?")}
          />
          <QuickAction 
            icon={<Lightbulb className="w-3 h-3 md:w-4 md:h-4" />} 
            label="What skills will I learn?" 
            onClick={() => handleQuickAction("What skills will I learn?")}
          />
        </div>
      </div>
    </div>
  );
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="flex items-center gap-1.5 md:gap-2 rounded-full border-neutral-700 bg-black/50 text-neutral-300 hover:text-white hover:bg-neutral-800 px-2.5 py-1.5 md:px-4 md:py-2 h-auto"
    >
      {icon}
      <span className="text-[10px] md:text-xs leading-tight">{label}</span>
    </Button>
  );
}

// Component to format AI messages with bold text, bullet points, and paragraphs
function FormattedMessage({ content }: { content: string }) {
  // Split content into lines
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let listItems: string[] = [];
  let listType: 'bullet' | 'numbered' | null = null;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ');
      elements.push(
        <p key={`p-${elements.length}`} className="mb-3">
          {formatInlineText(paragraphText)}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = listType === 'numbered' ? 'ol' : 'ul';
      elements.push(
        <ListTag 
          key={`list-${elements.length}`} 
          className={cn(
            "mb-3 space-y-2",
            listType === 'numbered' ? "list-decimal list-inside" : "list-disc list-inside"
          )}
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="ml-2">
              {formatInlineText(item)}
            </li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  const formatInlineText = (text: string) => {
    // Handle bold text with **
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Empty line - flush current paragraph or list
    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    // Check for bullet points (*, -, •)
    const bulletMatch = trimmedLine.match(/^[*\-•]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      if (listType !== 'bullet') {
        flushList();
        listType = 'bullet';
      }
      listItems.push(bulletMatch[1]);
      return;
    }

    // Check for numbered lists (1., 2., etc.)
    const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      flushParagraph();
      if (listType !== 'numbered') {
        flushList();
        listType = 'numbered';
      }
      listItems.push(numberedMatch[1]);
      return;
    }

    // Regular text - add to current paragraph
    flushList();
    currentParagraph.push(trimmedLine);
  });

  // Flush any remaining content
  flushParagraph();
  flushList();

  return <div className="space-y-1">{elements}</div>;
}
