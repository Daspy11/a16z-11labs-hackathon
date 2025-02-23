'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }) {
  useEffect(() => {
    posthog.init("phc_dgu0FDeoblPltZyqmGiN4R646iUdrUqBBjmHFdgDI98", {
      api_host: "https://us.i.posthog.com",
      person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}