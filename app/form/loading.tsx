"use client"
import Spinner from "../components/spinner/Spinner"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex items-center justify-center h-screen">
    <Spinner />
  </div>
  }