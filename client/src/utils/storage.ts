'use client'

export const storeCurrentUserId = (currentUserId: string) => {
  window.sessionStorage.setItem('currentUserId', currentUserId)
}

export const deleteCurrentUserId = () => {
  window.sessionStorage.removeItem('currentUserId')
}

export const getCurrentUserId = () => {
  return window.sessionStorage.getItem('currentUserId')
}
