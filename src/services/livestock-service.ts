import { supabase } from '@/supabase'
import type { AnimalListing } from '@/types/listing'

class LivestockService {
  async save(listing: AnimalListing) {
    const { data, error } = await supabase.from('livestock').insert([listing])
    return { data, error }
  }

  async update(listingId: number, updatedData: Partial<AnimalListing>) {
    const { data, error } = await supabase.from('livestock').update(updatedData).eq('id', listingId)

    return { data, error }
  }

  async delete(listingId: number) {
    const { data, error } = await supabase.from('livestock').delete().eq('id', listingId)
    if (error) {
      console.error('Delete failed:', error)
      throw error
    }

    return data
  }

  async getBySeller(sellerId: string, limiter?: number, listingId?: string) {
    let query = supabase
      .from('livestock')
      .select('*')
      .eq('seller_id', sellerId)
      .order('listed_date', { ascending: false })

    if (limiter !== undefined) {
      query = query.limit(limiter)
    }

    if (listingId !== undefined) {
      query = query.neq('id', listingId)
    }

    const { data, error } = await query

    return { data, error }
  }

  async getForMarket(limiter?: number, category?: string) {
    let query = supabase
      .from('livestock')
      .select(
      `
        *,
        farms(*)
      `)
      .eq('status', 'Active')
      .eq('auction', false)
      .order('listed_date', { ascending: false })

    if (limiter !== undefined) {
      query = query.limit(limiter)
    }

    if (category !== undefined) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    return { data, error }
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from('livestock')
      .select(
        `
      *,
      farms (*)
    `,
      )
      .eq('id', id)
      .eq('auction', false)
      .maybeSingle()

    return { data, error }
  }
}

export const livestock = new LivestockService()
