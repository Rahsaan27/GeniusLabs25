export interface CohortStyle {
  id: string;
  name: string;
  fullName: string;
  location: string;
  description: string;
  gradient: string;
  emoji: string;
  accent: string;
  bgPattern: string;
  cohortCount: number;
}

export const cohortStyles: CohortStyle[] = [
  {
    id: 'oak',
    name: 'Oak',
    fullName: 'Oakland',
    location: 'Oakland, CA',
    description: 'Bay Area innovation meets community spirit',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    emoji: '🌉',
    accent: 'border-orange-400',
    bgPattern: 'bg-gradient-to-br from-orange-900/20 to-red-900/20',
    cohortCount: 15
  },
  {
    id: 'la',
    name: 'LA',
    fullName: 'Los Angeles',
    location: 'Los Angeles, CA',
    description: 'Hollywood creativity meets tech innovation',
    gradient: 'from-purple-500 via-pink-500 to-red-500',
    emoji: '🌴',
    accent: 'border-purple-400',
    bgPattern: 'bg-gradient-to-br from-purple-900/20 to-pink-900/20',
    cohortCount: 6
  },
  {
    id: 'baltimore',
    name: 'Baltimore',
    fullName: 'Baltimore',
    location: 'Baltimore, MD',
    description: 'Harbor city hustle with East Coast energy',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    emoji: '⚓',
    accent: 'border-blue-400',
    bgPattern: 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20',
    cohortCount: 1
  },
  {
    id: 'chicago',
    name: 'Chicago',
    fullName: 'Chicago',
    location: 'Chicago, IL',
    description: 'Windy City ambition drives innovation',
    gradient: 'from-indigo-500 via-purple-500 to-blue-500',
    emoji: '🏙️',
    accent: 'border-indigo-400',
    bgPattern: 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20',
    cohortCount: 2
  },
  {
    id: 'detroit',
    name: 'Detroit',
    fullName: 'Detroit',
    location: 'Detroit, MI',
    description: 'Motor City grit builds the future',
    gradient: 'from-gray-500 via-slate-500 to-zinc-500',
    emoji: '🏭',
    accent: 'border-gray-400',
    bgPattern: 'bg-gradient-to-br from-gray-900/20 to-slate-900/20',
    cohortCount: 2
  }
];