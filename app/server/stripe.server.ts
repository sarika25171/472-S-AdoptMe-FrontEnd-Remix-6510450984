import Stripe from 'stripe'
import { stripeSecretKeyPath } from './config.server'

export const stripe = new Stripe(stripeSecretKeyPath(), {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
})
