import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useHandleLogout = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const loading = toast.loading('Logging out...')
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
        },
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.errors?.[0]?.message || 'Logout failed')
      }

      toast.success('Logged out successfully')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      toast.dismiss(loading)
      setIsLoading(false)
    }
  }

  return { handleLogout, isLoading }
}

export default useHandleLogout
