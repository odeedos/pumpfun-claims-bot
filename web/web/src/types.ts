/**
 * Shared event types that mirror the PumpFun channel bot's server-side types.
 * These are what the SSE stream emits.
 */

export type FeedEventType = 'launch' | 'trade' | 'graduation' | 'claim' | 'distribution'

// ── Token Launch ────────────────────────────────────────────────────────────

export interface TokenLaunchEvent {
  type: 'launch'
  txSignature: string
  slot: number
  timestamp: number

  mintAddress: string
  creatorWallet: string
  name: string
  symbol: string
  description: string
  metadataUri: string
  hasGithub: boolean
  githubUrls: string[]
  mayhemMode: boolean
  cashbackEnabled: boolean

  /** IPFS / Arweave metadata (fetched from metadataUri) */
  metadata?: {
    image?: string
    twitter?: string
    telegram?: string
    website?: string
    showName?: boolean
    createdOn?: string
    [key: string]: unknown
  }
}

// ── Trade Alert ─────────────────────────────────────────────────────────────

export interface TradeAlertEvent {
  type: 'trade'
  txSignature: string
  slot: number
  timestamp: number

  mintAddress: string
  tokenName?: string
  tokenSymbol?: string
  user: string
  creator: string
  isBuy: boolean
  solAmount: number           // SOL (not lamports)
  tokenAmount: number
  fee: number
  creatorFee: number
  virtualSolReserves: number
  virtualTokenReserves: number
  realSolReserves: number
  realTokenReserves: number
  mayhemMode: boolean
  marketCapSol: number
  bondingCurveProgress: number  // 0-100
}

// ── Graduation ──────────────────────────────────────────────────────────────

export interface GraduationEvent {
  type: 'graduation'
  txSignature: string
  slot: number
  timestamp: number

  mintAddress: string
  tokenName?: string
  tokenSymbol?: string
  user: string
  bondingCurve: string
  isMigration: boolean
  solAmount?: number
  mintAmount?: number
  poolMigrationFee?: number
  poolAddress?: string
}

// ── Fee Claim ───────────────────────────────────────────────────────────────

export interface FeeClaimEvent {
  type: 'claim'
  txSignature: string
  slot: number
  timestamp: number

  claimerWallet: string
  tokenMint: string
  tokenName?: string
  tokenSymbol?: string
  amountSol: number
  claimLabel: string
  claimType: string
  isCashback: boolean
  githubUserId?: string
  githubHandle?: string
  lifetimeClaimedSol?: number
  claimNumber?: number
  isFirstClaim?: boolean

  /** Token market cap in SOL at the time of the claim */
  marketCapSol?: number
  /** Holder count at time of claim */
  holderCount?: number
}

// ── Fee Distribution ─────────────────────────────────────────────────────────

export interface FeeDistributionEvent {
  type: 'distribution'
  txSignature: string
  slot: number
  timestamp: number

  mintAddress: string
  tokenName?: string
  tokenSymbol?: string
  bondingCurve: string
  admin: string
  distributedSol: number
  shareholders: Array<{ address: string; shareBps: number }>
}

// ── Union ──────────────────────────────────────────────────────────────────

export type FeedEvent =
  | TokenLaunchEvent
  | TradeAlertEvent
  | GraduationEvent
  | FeeClaimEvent
  | FeeDistributionEvent

// ── SSE frame ─────────────────────────────────────────────────────────────

export interface SSEFrame {
  event: FeedEventType
  data: FeedEvent
}
