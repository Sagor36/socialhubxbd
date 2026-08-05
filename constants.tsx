import React from 'react';
import { Service } from './types';

// Admin Login Password
export const ADMIN_PASSWORD = '1234';

// Contact Information
export const SUPPORT_NUMBER = '+8801318102806';
export const PAYMENT_NUMBER = '01408461902';
export const SUPPORT_EMAIL = 'socialhubxbd@gmail.com';

// Default Services
export const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    category: 'Facebook',
    name: 'Facebook Profile Followers [Real]',
    pricePer1k: 120,
    min: 100,
    max: 100000,
    description: 'High quality real followers',
  },
  {
    id: '2',
    category: 'Facebook',
    name: 'Facebook Post Likes [Non Drop]',
    pricePer1k: 45,
    min: 100,
    max: 50000,
    description: 'Stable likes for any post',
  },
  {
    id: '3',
    category: 'Instagram',
    name: 'Instagram Followers [HQ]',
    pricePer1k: 85,
    min: 100,
    max: 200000,
    description: 'Best for business accounts',
  },
  {
    id: '4',
    category: 'YouTube',
    name: 'YouTube Views [No Drop]',
    pricePer1k: 240,
    min: 500,
    max: 1000000,
    description: 'Worldwide safe views',
  },
  {
    id: '5',
    category: 'TikTok',
    name: 'TikTok Video Views [Instant]',
    pricePer1k: 10,
    min: 1000,
    max: 5000000,
    description: 'Super fast delivery',
  },
  {
    id: '6',
    category: 'Premium',
    name: 'Spotify Premium 1 Month',
    pricePer1k: 350,
    min: 1,
    max: 10,
    description: 'Direct login account',
  },
];
