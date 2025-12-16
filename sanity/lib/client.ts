import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '@/sanity/env'
import type { Intro, Event } from '@/sanity/types'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getIntro = async (): Promise<Intro[]> => {
  return client.fetch(`*[_type == "intro"]{
    text,
    imageLarge,
    imageMedium,
    imageSmall
  }`)
}

export const getEvents = async (): Promise<Event[]> => {
  return client.fetch(`*[_type == "events"]{
    date,
    location,
    venue,
    url
  }`)
}
