
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import type { Components } from 'react-markdown';

export const markdownComponents: Components = {
  code(props) {
    const match = /language-(\w+)/.exec(props.className || '');
    const language = match ? match[1] : '';
    
    if (!props.children || typeof props.children !== 'string') {
      return <code {...props} />;
    }

    if (!language) {
      return (
        <code {...props} className="px-1 py-0.5 rounded bg-muted font-mono text-xs">
          {props.children}
        </code>
      );
    }

    return (
      <Highlight
        theme={themes.github}
        code={props.children.replace(/\n$/, '')}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${className} p-3 rounded-md text-xs overflow-x-auto my-3 bg-muted/50 border`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell text-muted-foreground pr-4 select-none">{i + 1}</span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },
  h1: ({ children }) => (
    <h1 className="text-base font-bold tracking-tight mt-1 first:mt-0 mb-2">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-semibold tracking-tight mt-4 first:mt-0 mb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-medium tracking-tight mt-3 first:mt-0 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="leading-normal mb-2 last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-2 ml-2 space-y-1 list-disc list-inside">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 ml-2 space-y-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-muted-foreground">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-muted pl-4 my-3 italic text-muted-foreground">{children}</blockquote>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
};
