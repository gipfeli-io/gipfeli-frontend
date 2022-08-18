import React, { useEffect, useState } from 'react'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'
import styles from './Editor.module.scss'
import Typography from '@mui/material/Typography'
import MarkdownElement from './MarkdownElement'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

type EditorProps = {
  name: string;
  error: boolean;
  helperText: string | undefined;
  initialContent: string;
  onChange: (text: string) => void
}
const Editor = ({ initialContent, onChange, name, error, helperText }: EditorProps) => {
  const [value, setValue] = useState<string>(initialContent)

  useEffect(() => {
    onChange(value)
  }, [value])

  useEffect(() => {
    const instance = new EasyMDE({
      element: document.getElementById(name)!,
      toolbar: [
        'bold',
        'italic',
        'ordered-list',
        'unordered-list',
        'heading-1',
        '|',
        'link',
        'horizontal-rule']
    })

    instance.codemirror.on('change', () => {
      setValue(instance.value())
    })

    return () => {
      // Required for devmode to remove the editor properly
      instance.toTextArea()
      instance.cleanup()
    }
  }, [])

  return (
    <>
      <div className={error ? styles.editorError : ''}>
        <textarea id={name} value={value} readOnly></textarea>
      </div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MarkdownElement value={value}/>
        </AccordionDetails>
      </Accordion>
      {error &&
          <Typography color={'error'} variant="caption" component="div">
            {helperText}
          </Typography>
      }
    </>
  )
}

export default Editor
