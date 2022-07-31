import { useMemo, useState } from 'react'
import { ApiResponseWrapper, ValidationError } from '../types/api'

const useFormErrors = () => {
  const [formErrorContainer, setFormErrorContainer] = useState<ApiResponseWrapper>()
  const [overrideFormErrors, setOverrideFormErrors] = useState<ValidationError[] | undefined>()

  /**
   * Contains the current formErrors. Either extracts them from the given formErrorContainer or, if overrideFormErrors
   * is set, from that one. The overrideFormErrors can be used if the form handler is in a parent component, but the
   * children needs to display the errors - if so, pass down formErrors object and use setOverrideFormErrors in the
   * child component; then you can use the normal formErrors handlers. This is done so in the TourForm for example.
   */
  const formErrors = useMemo<ValidationError[]>(() => {
    if (overrideFormErrors !== undefined) {
      return overrideFormErrors
    }

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
  }, [formErrorContainer, overrideFormErrors])

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

  return { hasErrors, setFormErrorContainer, getFieldErrors, setOverrideFormErrors, formErrors }
}

export default useFormErrors
