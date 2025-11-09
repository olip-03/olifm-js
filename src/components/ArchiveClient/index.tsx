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
  // CLIENT-SIDE STATE FOR FILTERING
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  // ACTUAL FILTERING LOGIC (THIS WAS MISSING FROM YOUR ORIGINAL)
  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return posts // Show all posts when no filters selected
    }

    return posts.filter((post) => {
      const postCategoryIds =
        post.categories
          ?.filter(
            (cat): cat is Category => cat !== null && cat !== undefined && typeof cat !== 'number',
          )
          .map((cat) => cat.id) ?? []

      // Show post if it has ANY of the selected categories
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
