'use client'

import React from 'react'
import type { Category } from '@/payload-types'

export type Props = {
  categories: Category[]
  selectedCategories: Category[]
  onFilterChange: (selectedCategories: Category[]) => void
}

export const CollectionFilters: React.FC<Props> = ({
  categories,
  selectedCategories,
  onFilterChange,
}) => {
  const handleCategoryToggle = (category: Category) => {
    const isSelected = selectedCategories.some((selected) => selected.id === category.id)

    if (isSelected) {
      // Remove category from selection
      onFilterChange(selectedCategories.filter((selected) => selected.id !== category.id))
    } else {
      // Add category to selection
      onFilterChange([...selectedCategories, category])
    }
  }

  return (
    <div className="container mb-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.some((selected) => selected.id === category.id)

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
