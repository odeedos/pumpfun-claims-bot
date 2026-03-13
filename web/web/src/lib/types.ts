/** Re-export from parent types for convenience */
export type {
  FeedEvent,
  FeedEventType,
  TokenLaunchEvent,
  TradeAlertEvent,
  GraduationEvent,
  FeeClaimEvent,
  FeeDistributionEvent,
  SSEFrame,
} from '../types'

export interface HealthStatus {
  status: 'ok' | 'degraded'
  uptime: string
  uptimeMs: number
  [key: string]: unknown
}

export interface Watch {
  address: string
  label?: string
  addedAt?: number
}
