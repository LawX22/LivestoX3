// src/services/locationService.ts
// Uses official Philippine Standard Geographic Code (PSGC) API

export interface Region {
  code: string
  name: string
  regionName: string
}

export interface Province {
  code: string
  name: string
  regionCode: string
}

export interface CityMunicipality {
  code: string
  name: string
  provinceCode: string
  isCity: boolean
}

export interface Barangay {
  code: string
  name: string
  cityMunicipalityCode: string
}

export class LocationService {
  private static BASE_URL = 'https://psgc.gitlab.io/api'
  private static cache: Map<string, any> = new Map()

  // Cache helper
  private static async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }
    const data = await fetcher()
    this.cache.set(key, data)
    return data
  }

  // Check if region is NCR
  static isNCRRegion(regionCode: string): boolean {
    return regionCode.startsWith('13') && regionCode.length === 9
  }

  // Get all regions
  static async getRegions(): Promise<Region[]> {
    return this.getCached('regions', async () => {
      const response = await fetch(`${this.BASE_URL}/regions/`)
      if (!response.ok) throw new Error('Failed to fetch regions')
      const data = await response.json()
      return data.map((item: any) => ({
        code: item.code,
        name: item.name,
        regionName: item.regionName || item.name
      }))
    })
  }

  // Get provinces by region code
  static async getProvinces(regionCode: string): Promise<Province[]> {
    // NCR has no provinces
    if (this.isNCRRegion(regionCode)) {
      return []
    }

    return this.getCached(`provinces-${regionCode}`, async () => {
      const response = await fetch(`${this.BASE_URL}/regions/${regionCode}/provinces/`)
      if (!response.ok) throw new Error('Failed to fetch provinces')
      const data = await response.json()
      return data.map((item: any) => ({
        code: item.code,
        name: item.name,
        regionCode: item.regionCode
      }))
    })
  }

  // Get cities/municipalities by province code OR region code (for NCR)
  static async getCities(provinceOrRegionCode: string): Promise<CityMunicipality[]> {
    // Check if this is NCR - fetch cities directly from region
    if (this.isNCRRegion(provinceOrRegionCode)) {
      return this.getCached(`ncr-cities-${provinceOrRegionCode}`, async () => {
        const response = await fetch(`${this.BASE_URL}/regions/${provinceOrRegionCode}/cities-municipalities/`)
        if (!response.ok) throw new Error('Failed to fetch NCR cities')
        const data = await response.json()
        return data.map((item: any) => ({
          code: item.code,
          name: item.name,
          provinceCode: provinceOrRegionCode, // Use region code as province code for NCR
          isCity: item.isCity || false
        }))
      })
    }

    // Regular province - fetch cities
    return this.getCached(`cities-${provinceOrRegionCode}`, async () => {
      const response = await fetch(`${this.BASE_URL}/provinces/${provinceOrRegionCode}/cities-municipalities/`)
      if (!response.ok) throw new Error('Failed to fetch cities')
      const data = await response.json()
      return data.map((item: any) => ({
        code: item.code,
        name: item.name,
        provinceCode: item.provinceCode,
        isCity: item.isCity || false
      }))
    })
  }

  // Get barangays by city/municipality code
  static async getBarangays(cityCode: string): Promise<Barangay[]> {
    return this.getCached(`barangays-${cityCode}`, async () => {
      const response = await fetch(`${this.BASE_URL}/cities-municipalities/${cityCode}/barangays/`)
      if (!response.ok) throw new Error('Failed to fetch barangays')
      const data = await response.json()
      return data.map((item: any) => ({
        code: item.code,
        name: item.name,
        cityMunicipalityCode: item.cityMunicipalityCode || item.cityCode
      }))
    })
  }

  // Helper: Find region by name
  static async findRegionByName(name: string): Promise<Region | undefined> {
    const regions = await this.getRegions()
    return regions.find(r => 
      r.name.toLowerCase().includes(name.toLowerCase()) ||
      r.regionName.toLowerCase().includes(name.toLowerCase())
    )
  }

  // Helper: Find province by name in a region
  static async findProvinceByName(regionCode: string, name: string): Promise<Province | undefined> {
    const provinces = await this.getProvinces(regionCode)
    return provinces.find(p => p.name.toLowerCase().includes(name.toLowerCase()))
  }

  // Helper: Find city by name in a province
  static async findCityByName(provinceCode: string, name: string): Promise<CityMunicipality | undefined> {
    const cities = await this.getCities(provinceCode)
    return cities.find(c => c.name.toLowerCase().includes(name.toLowerCase()))
  }

  // Clear cache (useful for updates)
  static clearCache(): void {
    this.cache.clear()
  }
}