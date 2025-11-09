'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, useEffect } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  displayMode?: 'grid' | 'list'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, displayMode } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  const isListMode = displayMode === 'list'

  return (
    <article
      className={cn(
        'border flex border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer ',
        isListMode ? 'flex-row h-32' : 'flex-col ', // Add fixed height
        className,
      )}
      ref={card.ref}
    >
      <div className={cn('relative', isListMode ? 'w-48 flex-shrink-0' : 'w-full')}>
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size={isListMode ? '200px' : '33vw'}
            className={isListMode ? 'h-full object-cover w-full' : ''}
          />
        )}
      </div>
      <div className={cn('p-4 overflow-hidden', isListMode ? 'flex-1 min-h-0' : '')}>
        {/* Content with text truncation */}
        {showCategories && hasCategories && (
          <div className="uppercase text-sm">{/* categories content */}</div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3 className={isListMode ? 'line-clamp-2' : ''}>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            <p className={isListMode ? 'line-clamp-2 text-sm' : ''}>{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
