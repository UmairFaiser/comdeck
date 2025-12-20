import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "app/blog/posts");
  const postFolders = fs.readdirSync(postsDirectory);

  const posts = postFolders
    .map((folder) => {
      const filePath = path.join(postsDirectory, folder, `${folder}.mdx`);
      if (!fs.existsSync(filePath)) return null;

      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: folder,
        title: data.title,
        createdAt: data.createdAt,
        subject: data.subject,
        unit: data.unit,
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.createdAt).getTime() - new Date(a!.createdAt).getTime()
    );

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <Link href="/blog">
          <h1 className="text-center py-10 text-foreground text-4xl">Blogs</h1>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] rounded-lg border lg:divide-x divide-border border-border mx-3 lg:mx-8 min-h-[500px]">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-6">Recent Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post!.slug}
                href={`/blog/${post!.subject.toLowerCase()}/${post!.slug}`}
                className="block p-4 rounded-xl border border-border hover:bg-surface-hover transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {post!.subject} Unit {post!.unit}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {post!.createdAt}
                  </span>
                </div>
                <h3 className="font-medium group-hover:text-accent transition-colors">
                  {post!.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center p-12 text-text-secondary">
          <p>Select a post from the left to start reading.</p>
        </div>
      </div>
    </>
  );
}
