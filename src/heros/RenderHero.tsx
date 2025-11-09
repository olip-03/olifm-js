import React from 'react'

import type { Page } from '@/payload-types'

import { CenterAlignHero } from '@/heros/CentreAlign'
import { LeftAlignHero } from '@/heros/LeftAlign'
import { RightAlignHero } from '@/heros/RightAlign'

const heroes = {
  centreAlign: CenterAlignHero,
  leftAlign: LeftAlignHero,
  rightAlign: RightAlignHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
