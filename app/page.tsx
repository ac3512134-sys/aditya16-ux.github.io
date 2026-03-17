"use client";

import { FormEvent, useState } from "react";
import OutputCard from "@/components/OutputCard";
import { ContentOutput } from "@/lib/mockAi";

const initialOutput: ContentOutput = {
  captions: [],
  instagramReelScript: "",
  youtubeShortsScript: "",
  hooks: [],
  hashtags: [],
  titleIdeas: [],
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [output, setOutput] = useState<ContentOutput>(initialOutput);

  const hasResults = output.captions.length > 0;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!topic.trim()) {
      setError("Please enter an idea or topic.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to generate content.");
      }

      setOutput(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-14 md:px-10">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-surface/60 p-8 shadow-glow backdrop-blur-md md:p-12">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-violet-300">Content Engine AI</p>
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">Turn One Idea Into Viral Content</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Generate multi-platform content in seconds for Instagram, YouTube Shorts, and blog growth.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label htmlFor="topic" className="block text-sm font-medium text-white/80">
            Enter your idea or topic
          </label>
          <textarea
            id="topic"
            placeholder="Ex: How fitness coaches can create daily short-form content"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="h-32 w-full rounded-2xl border border-white/15 bg-black/20 p-4 text-white placeholder:text-white/35 outline-none ring-violet-400 transition focus:ring-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </section>

      {hasResults && (
        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <OutputCard title="7 Instagram Captions" items={output.captions} />
          <OutputCard title="Instagram Reel Script" content={output.instagramReelScript} />
          <OutputCard title="YouTube Shorts Script" content={output.youtubeShortsScript} />
          <OutputCard title="5 Viral Hooks" items={output.hooks} />
          <OutputCard title="Hashtags" items={output.hashtags} />
          <OutputCard title="Title Ideas" items={output.titleIdeas} />
        </section>
      )}
    </main>
  );
}
