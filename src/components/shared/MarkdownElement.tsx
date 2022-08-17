import React, { PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'

type MarkdownElementProps = {
  value: string;
}

const ALLOWED_HTML_TAGS = ['p', 'h1', 'i', 'hr', 'ul', 'li', 'ol', 'a']

const MarkdownElement = ({ value }: MarkdownElementProps) => {
  const componentOverrides: Record<string, (ele: PropsWithChildren) => JSX.Element> = {
    h1: ({ children }: PropsWithChildren): JSX.Element => {
      return <Typography variant="h6" gutterBottom component="div" >{children}</Typography>
    }
  }

  return (
    <ReactMarkdown
      allowedElements={ALLOWED_HTML_TAGS}
      components={componentOverrides}
    >
      {value}
    </ReactMarkdown>
  )
}

export default MarkdownElement
