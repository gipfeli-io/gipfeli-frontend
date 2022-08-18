import React, { useEffect } from 'react'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'
import styles from './Editor.module.scss'
import Typography from '@mui/material/Typography'

type EditorProps = {
  name: string;
  error: boolean;
  helperText: string | undefined;
  initialContent: string;
  onChange: (text: string) => void
}
const Editor = ({ initialContent, onChange, name, error, helperText }: EditorProps) => {
  useEffect(() => {
    const instance = new EasyMDE({
      element: document.getElementById(name)!,
      toolbar: [
        'bold',
        'italic',
        'ordered-list',
        'unordered-list',
        'heading',
        '|',
        'link',
        'horizontal-rule']
    })
    const changeHandler = onChange

    instance.codemirror.on('change', () => {
      changeHandler(instance.value())
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
        <textarea id={name} value={initialContent} readOnly></textarea>
      </div>
      {error &&
          <Typography color={'error'} variant="caption" component="div">
            {helperText}
          </Typography>
      }
    </>
  )
}

export default Editor
