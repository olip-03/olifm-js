import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import type { Category } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ArchiveClient } from '@/components/ArchiveClient'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    displayMode,
    selectedDocs,
    enableFiltering,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let filterCategories: Category[] = []

  // SERVER-SIDE DATA FETCHING
  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })
    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs
        .map((post) => {
          if (typeof post.value === 'object') return post.value
        })
        .filter(Boolean) as Post[]

      posts = filteredSelectedPosts
    }
  }

  // EXTRACT UNIQUE CATEGORIES (FIXED YOUR ORIGINAL LOGIC)
  filterCategories = [
    ...new Map(
      posts
        .flatMap((post) => post.categories ?? [])
        .filter(
          (category): category is Category =>
            category !== null && category !== undefined && typeof category !== 'number',
        )
        .map((category) => [category.id, category]),
    ).values(),
  ]

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}

      {/* PASS DATA TO CLIENT COMPONENT */}
      <ArchiveClient
        posts={posts}
        filterCategories={filterCategories}
        displayMode={displayMode}
        enableFiltering={enableFiltering === 'true'}
      />
    </div>
  )
}
