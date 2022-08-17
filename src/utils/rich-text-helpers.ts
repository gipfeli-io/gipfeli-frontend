import EasyMDE from 'easymde'

export const attachRichTextInstance = (target: HTMLElement): EasyMDE => {
  const instance = new EasyMDE({
    element: target,
    toolbar: [
      'bold',
      'italic',
      'ordered-list',
      'unordered-list',
      'heading',
      '|',
      'link',
      'horizontal-rule',
      '|',
      'guide']
  })

  return instance
}
