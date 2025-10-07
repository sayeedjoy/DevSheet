import React from "react";

import { CodeBlock, InlineCode } from "./code-block";

export const mdxComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 bangla-text" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 bangla-text" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-bold mt-4 mb-2 bangla-text" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => {
    // Check if paragraph contains only a code block (to avoid nesting issues)
    const isCodeBlock =
      React.Children.count(children) === 1 &&
      React.isValidElement(children) &&
      (children as any)?.props?.node?.tagName === "pre";

    if (isCodeBlock) {
      return <>{children}</>;
    }

    return (
      <p className="mb-4 bangla-text leading-relaxed" {...props}>
        {children}
      </p>
    );
  },
  pre: ({ children, ...props }: any) => {
    // Extract the code element and its props
    const codeElement = React.Children.toArray(children).find(
      (child: any) => React.isValidElement(child) && child.type === "code",
    ) as React.ReactElement;

    if (codeElement) {
      return (
        <CodeBlock className={codeElement.props.className} {...props}>
          {codeElement.props.children}
        </CodeBlock>
      );
    }

    // Fallback for pre without code
    return <CodeBlock {...props}>{children}</CodeBlock>;
  },
  code: ({ inline, className, children, ...props }: any) => {
    return inline ? (
      <InlineCode>{children}</InlineCode>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside mb-4 bangla-text" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside mb-4 bangla-text" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-2 bangla-text" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4 bangla-text"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, ...props }: any) => (
    <a className="text-primary hover:underline" {...props}>
      {children}
    </a>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold bangla-text" {...props}>
      {children}
    </strong>
  ),
};
