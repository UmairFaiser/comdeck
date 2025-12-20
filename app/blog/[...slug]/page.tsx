import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import InteractiveSandbox from "@/components/blog/InteractiveSandbox";
import rehypePrettyCode from "rehype-pretty-code";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

const components = {
  InteractiveSandbox,
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return notFound();
  }
  const postSlug = slug[slug.length - 1];
  const filePath = path.join(
    process.cwd(),
    "app/blog/posts",
    postSlug,
    `${postSlug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return notFound();
  }
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  // Transform authors for AnimatedTooltip
  const authorItems = Array.isArray(frontmatter.authors)
    ? frontmatter.authors.map((author: any, index: number) => {
        if (typeof author === "string") {
          return {
            id: index + 1,
            name: author,
            designation: "Contributor",
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              author
            )}&background=random`,
          };
        }
        return {
          id: index + 1,
          ...author,
        };
      })
    : [];

  const mdxOptions: any = {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark",
              light: "github-light",
            },
            keepBackground: true,
            onVisitLine(node: any) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine(node: any) {
              if (!node.properties) {
                node.properties = {};
              }
              if (!node.properties.className) {
                node.properties.className = [];
              }
              node.properties.className.push("line--highlighted");
            },
            onVisitHighlightedWord(node: any) {
              if (!node.properties) {
                node.properties = {};
              }
              node.properties.className = ["word--highlighted"];
            },
          },
        ],
      ],
    },
  };

  return (
    <article className="max-w-3xl mx-auto py-10 px-5 blog-post">
      <header className="mb-8 mt-4 border-b border-border pb-8">
        <h1 className="text-5xl mb-4 text-center font-serif font-normal">
          {frontmatter.title}
        </h1>
        <div className="border border-border rounded-4xl max-w-fit mx-auto py-0.5 text-s bg-surface-hover px-3">
          <p className="text-center">
            {frontmatter.subject} unit {frontmatter.unit}
          </p>
        </div>
        <div className="flex justify-between items-center mt-10 text-text-secondary text-sm">
          <AnimatedTooltip items={authorItems} />
          <p>Written on {frontmatter.createdAt}</p>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none 
        prose-headings:text-foreground 
        prose-p:text-text-secondary 
        prose-strong:text-foreground 
        prose-pre:bg-transparent 
        prose-pre:p-0 
        prose-pre:border-none">
        <MDXRemote 
          source={content} 
          components={components} 
          options={mdxOptions} 
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Shiki / rehype-pretty-code Styles */
        .blog-post [data-rehype-pretty-code-figure] {
          margin: 2rem 0;
        }

        .blog-post [data-rehype-pretty-code-figure] pre {
          padding: 1rem 0;
          overflow-x: auto;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          font-family: var(--font-mono), monospace !important;
          font-size: 0.875rem;
          line-height: 1.7;
        }

        /* Dual Theme Support */
        [data-rehype-pretty-code-figure] pre[data-theme='light'],
        [data-rehype-pretty-code-figure] pre[data-theme='light'] code,
        [data-rehype-pretty-code-figure] pre[data-theme='light'] span {
          color: inherit !important;
        }

        [data-rehype-pretty-code-figure] pre[data-theme='light'] {
          display: block;
          background-color: #ffffff !important;
        }
        [data-rehype-pretty-code-figure] pre[data-theme='dark'] {
          display: none;
          background-color: #0d1117 !important;
        }

        html[data-theme='dark'] [data-rehype-pretty-code-figure] pre[data-theme='light'] {
          display: none;
        }
        html[data-theme='dark'] [data-rehype-pretty-code-figure] pre[data-theme='dark'] {
          display: block;
        }

        .blog-post [data-rehype-pretty-code-figure] code {
          display: grid;
          min-width: 100%;
          width: fit-content;
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
        }

        /* Ensure Shiki colors are preserved by overriding prose colors */
        /* rehype-pretty-code uses CSS variables for dual themes when configured this way */
        .blog-post [data-rehype-pretty-code-figure] code span {
          color: var(--shiki-light);
        }
        html[data-theme='dark'] .blog-post [data-rehype-pretty-code-figure] code span {
          color: var(--shiki-dark);
        }
        
        .blog-post [data-line] {
          padding: 0 1.25rem;
          border-left: 3px solid transparent;
          min-width: 100%;
          display: inline-block;
        }

        /* Line Highlighting */
        .blog-post .line--highlighted {
          background-color: rgba(155, 155, 155, 0.1) !important;
          border-left-color: var(--accent) !important;
        }
        html[data-theme='dark'] .blog-post .line--highlighted {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }

        /* Word Highlighting */
        .blog-post .word--highlighted {
          background-color: rgba(155, 155, 155, 0.2) !important;
          padding: 0.2rem 0.25rem;
          border-radius: 0.25rem;
          color: inherit !important;
        }
        html[data-theme='dark'] .blog-post .word--highlighted {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }

        .blog-post code {
          font-family: var(--font-mono), monospace !important;
        }

        /* Inline code */
        .prose :not(pre) > code {
          background-color: var(--surface-hover) !important;
          padding: 0.2rem 0.4rem !important;
          border-radius: 0.4rem !important;
          font-size: 0.9em !important;
          color: var(--accent) !important;
        }
        
        .prose :not(pre) > code::before,
        .prose :not(pre) > code::after {
          content: "" !important;
        }
      `}} />
    </article>
  );
}
