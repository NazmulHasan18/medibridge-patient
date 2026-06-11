"use client";

interface Props {
  content: string;
}

export function BlogContent({ content }: Props) {
  return (
    <article
      className="prose prose-neutral max-w-none dark:prose-invert
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-p:leading-relaxed prose-p:text-foreground/80
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
        prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5
        prose-img:rounded-lg"
    >
      {/* If content is plain text, render with preserved whitespace.
          If you later switch to markdown/html, swap this for a renderer. */}
      {content?.split("\n\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </article>
  );
}
