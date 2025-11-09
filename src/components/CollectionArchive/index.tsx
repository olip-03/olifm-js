import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
  displayMode?: 'grid' | 'list' | undefined
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className={`grid ${props.displayMode === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <Card
                    className="h-full"
                    doc={result}
                    relationTo="posts"
                    displayMode={props.displayMode}
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
