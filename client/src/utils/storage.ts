'use client'

export const storeCurrentUserId = (currentUserId: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem('currentUserId', currentUserId)
  }
}

export const deleteCurrentUserId = () => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('currentUserId')
  }
}

export const getCurrentUserId = () => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem('currentUserId')
  }
  return null
}
