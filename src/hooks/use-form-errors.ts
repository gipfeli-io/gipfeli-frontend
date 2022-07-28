import { useMemo, useState } from 'react'
import { ApiResponseWrapper, ValidationError } from '../types/api'

const useFormErrors = () => {
  const [formErrorContainer, setFormErrorContainer] = useState<ApiResponseWrapper>()

  const formErrors = useMemo<ValidationError[]>(() => {
    if (!formErrorContainer) {
      return []
    }

    if (formErrorContainer.statusCode === 400 &&
      formErrorContainer.error?.message &&
      Array.isArray(formErrorContainer.error?.message)
    ) {
      return formErrorContainer.error.message
    }

    return []
  }, [formErrorContainer])

  /**
   * Checks whether a given fieldname has a form error attached.
   * @param fieldName
   */
  const hasErrors: (fieldName: string) => boolean = (fieldName: string) => {
    return formErrors ? formErrors.some((error) => error.property === fieldName) : false
  }

  /**
   * Returns a ;-delimited list of errors that are attached to the field or undefined
   * @param fieldName
   */
  const getFieldErrors: (fieldName: string) => (string | undefined) = (fieldName: string) => {
    const errors = formErrors.find((error) => error.property === fieldName)

    if (errors) {
      return errors.errors.join('; ')
    }
  }

  return { hasErrors, setFormErrorContainer, getFieldErrors }
}

export default useFormErrors
