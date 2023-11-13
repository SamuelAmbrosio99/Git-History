'use client';
import { useState } from 'react'
import CommitList from '@/components/home/commits'
import Stats from '@/components/home/stats'
import { ApiProvider } from '@/context/data';
import GeneralDrawer from '@/components/generalDrawer';
import { ChangeUserModal, ChangeRepoModal } from '@/components/changeUserRepo';

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
    <ApiProvider>
      <ChangeUserModal />
      <ChangeRepoModal />
      <GeneralDrawer />
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full flex flex-col">
          <main className="flex max-h-screen overflow-auto">
            <div className="container">
              <div className="mx-4" style={{
                display: !showStats ? 'none' : 'block'
              }}>
                <Stats />
              </div>
              <div className="mx-4">
                <CommitList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ApiProvider>
  )
}