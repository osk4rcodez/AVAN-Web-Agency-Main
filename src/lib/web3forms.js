const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

// Submits a plain field object to Web3Forms. Throws on network failure or
// when Web3Forms reports success: false, so callers can show an error state.
export async function submitToWeb3Forms(fields) {
  const formData = new FormData()
  formData.append('access_key', ACCESS_KEY)
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value)
    }
  })

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  })
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || 'Web3Forms submission failed')
  }
  return result
}
