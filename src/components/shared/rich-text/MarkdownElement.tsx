import React from 'react'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'
import { Divider, Link } from '@mui/material'

type MarkdownElementProps = {
  value: string;
}

const ALLOWED_HTML_TAGS = ['p', 'h1', 'strong', 'hr', 'ul', 'li', 'ol', 'a', 'em']

const MarkdownElement = ({ value }: MarkdownElementProps) => {
  /**
   * Define component overrides to use custom styles. Note that we had to use "any" because the typings as per the
   * documentation are somehow off.
   */
  const componentOverrides: Record<string, (ele: any) => JSX.Element> = {
    p: (ele): JSX.Element => {
      return <Typography variant="body1" gutterBottom component="div"
                         whiteSpace={'pre-wrap'}>{ele.children}</Typography>
    },
    h1: (ele): JSX.Element => {
      return <Typography variant="h6" gutterBottom component="div">{ele.children}</Typography>
    },
    hr: (): JSX.Element => {
      return <Divider/>
    },
    a: (ele): JSX.Element => {
      return <Link color={'inherit'} href={ele.href} target={'_blank'}>{ele.children}</Link>
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
