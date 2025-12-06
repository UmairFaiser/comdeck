"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Mic01Icon } from "@hugeicons/core-free-icons";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  defaultValue = "",
  placeholder = "Search resources...",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setIsProcessing(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        setIsProcessing(true);
        
        // Auto-submit after a short delay
        setTimeout(() => {
          if (transcript.trim()) {
            router.push(`/search?q=${encodeURIComponent(transcript.trim())}`);
          }
          setIsProcessing(false);
        }, 500);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setIsProcessing(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) {
      alert("Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border bg-surface px-4 py-3 pl-10 ${
            isSupported ? "pr-20" : "pr-4"
          } text-foreground placeholder:text-text-muted transition-all duration-200 ${
            isListening
              ? "border-red-500/50 ring-2 ring-red-500/20"
              : "border-border focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          }`}
        />
        <HugeiconsIcon
          icon={Search01Icon}
          size={20}
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary pointer-events-none"
        />
        {isSupported && (
          <button
            type="button"
            onClick={toggleListening}
            disabled={isProcessing}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ease-in-out ${
              isListening
                ? "bg-red-500 text-white shadow-lg shadow-red-500/50 scale-110"
                : isProcessing
                ? "bg-accent/20 text-accent scale-105"
                : "text-text-secondary hover:text-foreground hover:bg-border/20 hover:scale-105 active:scale-95"
            }`}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
          >
            <div className="relative">
              <HugeiconsIcon
                icon={Mic01Icon}
                size={20}
                className={`transition-transform duration-300 ${
                  isListening ? "scale-110" : ""
                }`}
              />
              {isListening && (
                <>
                  <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />
                  <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping animation-delay-150" />
                </>
              )}
            </div>
          </button>
        )}
      </div>
      {isListening && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className="flex gap-1 items-end h-6">
            <div className="w-1 h-4 bg-red-500 rounded-full waveform-bar-1" />
            <div className="w-1 h-6 bg-red-500 rounded-full waveform-bar-2" />
            <div className="w-1 h-5 bg-red-500 rounded-full waveform-bar-3" />
            <div className="w-1 h-4 bg-red-500 rounded-full waveform-bar-4" />
          </div>
          <span className="text-sm text-red-500 font-medium">Listening... Speak now</span>
        </div>
      )}
      {isProcessing && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-accent">Processing your voice input...</span>
        </div>
      )}
    </form>
  );
}

