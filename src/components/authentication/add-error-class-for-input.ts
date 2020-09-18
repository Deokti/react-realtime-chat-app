const addErrorClassForInput = (validFormError: string, includes: string) => {
  return validFormError.toLowerCase().includes(includes) ? 'input-error' : '';
}

export default addErrorClassForInput;