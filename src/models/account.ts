/*
 * Copyright © 2023 Anthony Software Group, LLC • All Rights Reserved
 */

type ContactPermission = string
type CountryCode = string
type Gender = string
type HonorificPrefix = string
type HonorificSuffix = string
type Interest = string
type Language = 'eng' | 'fra' | 'spa'
type MaritalStatus = string
type PronounObject = string
type PronounSubject = string
type Publication = string
type Role = string
type Site = string
type SocialMediaPermission = string
type SocialMediaPlatform = string
type TelephoneType = string
type VerifiedStatus = string

// export type SingleElement = string | number | boolean | Date | null
// export type ListElement = HonorificPrefix | HonorificSuffix | Language | Role | Interest | Email |
//   Telephone | Address | SocialMedia | Subscription

export interface Account {
  _id?: oid
  familyName: string | null
  givenName: string | null
  additionalName: string | null
  fullName: string | null
  honorificPrefix: Array<HonorificPrefix>
  honorificSuffix: Array<HonorificSuffix>
  organizationTitle: string | null
  birthDate: Date | null
  maritalStatus: MaritalStatus | null
  gender: Gender | null
  pronoun: Pronoun
  languages: Array<Language>
  roles: Array<Role>
  interests: Array<Interest>
  emails: Array<Email>
  telephones: Array<Telephone>
  addresses: Array<Address>
  socialMedia: Array<SocialMedia>
  subscriptions: Array<Subscription>
  aces: Aces
}

export interface oid {
  '$oid': string
}

export interface Pronoun {
  subject: PronounSubject | null
  object: PronounObject | null
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
