import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const getIntro = async () => {
  return client.fetch(`*[_type == "intro"]{
    text,
    imageLarge,
    imageMedium,
    imageSmall
  }`)
}
