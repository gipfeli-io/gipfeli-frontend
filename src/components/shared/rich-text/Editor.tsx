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
import 'font-awesome/css/font-awesome.min.css'

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
    /**
     * Note: Since the app has to work offline as well, we added the font-awesome dependency which is v4.7.x.
     * This allows us to inject the CSS and prevent the editor from trying to download font-awesome on each request,
     * which does not work when offline.
     */
    const instance = new EasyMDE({
      autoDownloadFontAwesome: false,
      element: document.getElementById(name)!,
      initialValue: initialContent,
      spellChecker: false,
      nativeSpellcheck: false,
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
        <textarea id={name} readOnly></textarea>
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
