import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
  displayMode?: 'grid' | 'list' | undefined
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, displayMode } = props

  return (
    <div className={cn('container')}>
      <div>
        {/*
          Defaulting to grid-cols-1 for small mobile views.
          If grid mode is active, it will step up to grid-cols-2 on medium screens (768px) and above.
        */}
        <div
          className={`grid ${displayMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-2`}
        >
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo="posts"
                    displayMode={displayMode}
                    showCategories
                  />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
