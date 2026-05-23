'use client'

import React, { useState, useMemo } from 'react'
import type { Post, Category } from '@/payload-types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { CollectionFilters } from '@/components/CollectionFilters'

type Props = {
  posts: Post[]
  filterCategories: Category[]
  displayMode?: any
  enableFiltering: boolean
}

export const ArchiveClient: React.FC<Props> = ({
  posts,
  filterCategories,
  displayMode,
  enableFiltering,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return posts
    }

    return posts.filter((post) => {
      const postCategoryIds =
        post.categories
          ?.filter(
            (cat): cat is Category => cat !== null && cat !== undefined && typeof cat !== 'number',
          )
          .map((cat) => cat.id) ?? []

      return selectedCategories.some((selectedCat) => postCategoryIds.includes(selectedCat.id))
    })
  }, [posts, selectedCategories])

  return (
    <>
      {enableFiltering && (
        <CollectionFilters
          categories={filterCategories}
          selectedCategories={selectedCategories}
          onFilterChange={setSelectedCategories}
        />
      )}
      <CollectionArchive posts={filteredPosts} displayMode={displayMode} />
    </>
  )
}
