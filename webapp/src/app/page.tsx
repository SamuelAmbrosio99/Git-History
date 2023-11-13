'use client';
import { useState } from 'react'
import CommitList from '@/components/home/commits'
import Stats from '@/components/home/stats'

export default function Home() {

  const [listIsExpanded, setListIsExpanded] = useState(false)
  const [showStats, setShowStats] = useState(true)

  const handleExpandList = () => {
    setListIsExpanded(!listIsExpanded)
    setTimeout(() => {
      setShowStats(!showStats)
    }, 500)
  }

  return (
    <>
      <div className="mx-4" style={{
        display: !showStats ? 'none' : 'block'
      }}>
        <Stats />
      </div>
      <div className="mx-4">
        <CommitList expandList={handleExpandList} listIsExpanded={listIsExpanded}/>
      </div>
    </>
  )
}