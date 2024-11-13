"use client"
import Spinner from "./components/spinner/Spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  )
}
