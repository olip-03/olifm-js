import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type RightAlignHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const RightAlignHero: React.FC<RightAlignHeroType> = ({ children, richText }) => {
  return (
    <div className="container">
      <div className="max-w-[48rem] mx-auto text-right">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
