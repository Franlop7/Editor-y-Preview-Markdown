import React from 'react';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighligter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import './preview.css';
import './github-markdown.css';

interface Props {
  doc: string;
}

export const Preview: React.FC<Props> = (props) => {
  return (
    <div className="preview markdown-body">
      <ReactMarkdown
        children={props.doc}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighligter
              children={String(children).replace(/\n$/, '')}
              style={prism}
              language={match[1]}
              PreTag='div'
              {...props}
              />
            ):(
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </div>
  );
};