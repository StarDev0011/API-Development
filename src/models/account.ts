/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

import { ObjectId } from 'mongodb'

type ContactPermission = string
type CountryCode = string
type Publication = string
type Site = string
type SocialMediaPermission = string
type SocialMediaPlatform = string
type TelephoneType = string
type VerifiedStatus = string

// export type SingleElement = string | number | boolean | Date | null
// export type ListElement = HonorificPrefix | HonorificSuffix | Language | Role | Interest | Email |
//   Telephone | Address | SocialMedia | Subscription

export interface Account {
  id?: ObjectId
  address: string | null
  address2: string | null
  addressVerified: string | null
  category: string | null
  city: string | null
  county: string | null
  districtCongressional: string | number | null
  districtSchoolElementary: string | null
  districtSchoolSecondary: string | null
  districtSchoolUnified: string | null
  districtStateLegislativeHouse: string | number | null
  districtStateLegislativeSenate: string | number | null
  email: string | null
  emailVerified: string | null
  firstName: string | null
  gender: string | null
  lastName: string | null
  maritalStatus: string | null
  middleName: string | null
  postalCode: string | null
  source: string | null
  state: string | null
  telephone: string | null
}

export interface Email {
  address: string
  site: Site
  notes: string | null
  permissions: Array<ContactPermission>
  verfiied?: Verified
}

export interface Telephone {
  number: string
  site: Site
  type: TelephoneType
  notes: string | null
  permissions: Array<ContactPermission>
  verified?: Verified
}

export interface Address {
  address: string | null
  address2: string | null
  city: string | null
  county: string | null
  state: string | null
  postalCode: string | null
  countryCode: CountryCode | null
  organization: string | null
  legislativeDistricts: LegislativeDistricts | null
  verified?: Verified
}

export interface SocialMedia {
  platform: SocialMediaPlatform
  address: string
  permissions: Array<SocialMediaPermission>
}

export interface Subscription {
  publication: Publication
  dates: {
    effective: Date | null,
    expiry: Date | null
  }
}

/**
 * Sourced from GeoCodio
 */
export interface LegislativeDistricts {
  congressional: string | null
  state: Array<string>
}

/**
 * ACES Workflow tracking
 */
export interface Aces {
  provenance: Provenance
  humanName: HumanName
}

/**
 * As defined by the HumanName API
 */
export interface HumanName {
  title: string | null
  first: string | null
  middle: string | null
  last: string | null
  suffix: string | null
  nickname: string | null
}

/**
 * ACES Workflow source tracking
 */
export interface Provenance {
  uploadId: string
  sourceFilename: string
  recordIndex: number | null
  origin: string
  domain: string
  model: string | null
  project: string | null
  context: string | null
}

/**
 * Results from data verification attempt
 */
export interface Verified {
  status: VerifiedStatus
  authority?: string
  date?: Date
  reason?: string
  content?: Record<string, unknown>
}
