export interface Launch {
    id: string
    name: string
    date_utc: string
    date_unix: number
    date_local: string
    date_precision: 'quarter' | 'half' | 'year' | 'month' | 'day' | 'hour'
    tbd: boolean
    net: boolean
    upcoming: boolean
    success: boolean | null
    details: string | null
    rocket: string
    flight_number: number
    launchpad: string
    crew: string[]
    ships: string[]
    capsules: string[]
    payloads: string[]
    cores: {
      core: string
      flight: number
      gridfins: boolean
      legs: boolean
      reused: boolean
      landing_attempt: boolean
      landing_success: boolean | null
      landing_type: string | null
      landpad: string | null
    }[]
    failures: {
      time: number
      altitude: number | null
      reason: string
    }[]
    links: {
      patch: {
        small: string | null
        large: string | null
      }
      reddit: {
        campaign: string | null
        launch: string | null
        media: string | null
        recovery: string | null
      }
      flickr: {
        small: string[]
        original: string[]
      }
      presskit: string | null
      webcast: string | null
      youtube_id: string | null
      article: string | null
      wikipedia: string | null
    }
    fairings: {
      reused: boolean | null
      recovery_attempt: boolean | null
      recovered: boolean | null
      ships: string[]
    } | null
    auto_update: boolean
    launch_library_id: string | null
  }

export interface Company {
    id: string
    name: string
    founder: string
    founded: number
    employees: number
    vehicles: number
    launch_sites: number
    test_sites: number
    ceo: string
    cto: string
    coo: string
    cto_propulsion: string
    valuation: number
    summary: string
    headquarters: {
      address: string
      city: string
      state: string
    }
    links: {
      website: string
      flickr: string
      twitter: string
      elon_twitter: string
    }
}

export interface Ship {
    id: string
    name: string
    legacy_id: string | null
    model: string | null
    type: string
    roles: string[]
    active: boolean
    imo: number | null
    mmsi: number | null
    abs: number | null
    class: number | null
    mass_kg: number | null
    mass_lbs: number | null
    year_built: number | null
    home_port: string | null
    status: string | null
    speed_kn: number | null
    course_deg: number | null
    latitude: number | null
    longitude: number | null
    link: string | null
    image: string | null
    launches: string[]
    last_ais_update: string | null
}

export interface QueryResponse<T> {
    docs: T[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
}

export interface Rocket {
    id: string
    name: string
    description: string
    active: boolean
}