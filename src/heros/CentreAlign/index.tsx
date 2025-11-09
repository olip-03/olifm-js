import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type CenterAlignHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const CenterAlignHero: React.FC<CenterAlignHeroType> = ({ children, richText }) => {
  return (
    <div className="container">
      <div className="max-w-[48rem] mx-auto text-center">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
