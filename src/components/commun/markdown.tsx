import { Typography } from '@mui/material';
import React, { ComponentProps } from 'react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { MyLink } from './link';

export const Markdown: React.FC<{ content?: string; className?: string }> = ({
  content,
  className,
}) => {

  const LinkRenderer = ({ href, children, ...props }: ComponentProps<"a">) => {
    if (href && !/^https?:\/\/|^www\./i.test(href)) {
      href = 'https://' + href;
    }

    return (
      <MyLink
        className="md-link"
        href={href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </MyLink>
    );
  };

  const HeadersRenderer = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const HeaderComponent: React.FC<React.ComponentProps<'h1'>> = ({ children, ...props }) => {
      return (
        <Typography
          style={{ color: 'white' }}
          variant={`h${level}`}
          {...props}
        >
          {children}
        </Typography>
      );
    };
    HeaderComponent.displayName = `MarkdownHeaderH${level}`;
    return HeaderComponent;
  };

  return (
    <>
      {content && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{a: LinkRenderer, h1: HeadersRenderer(1), h2: HeadersRenderer(2), h3: HeadersRenderer(3), h4: HeadersRenderer(4), h5: HeadersRenderer(5), h6: HeadersRenderer(6) }} className={className}>
          {content}
        </ReactMarkdown>
      )}
    </>
  );
};
