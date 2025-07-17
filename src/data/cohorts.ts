import { Cohort, CohortLocation } from '@/types/cohort';

export const cohortLocations: CohortLocation[] = [
  {
    id: 'oak',
    name: 'Oak',
    fullName: 'Oak City',
    cohortCount: 15,
    cohorts: Array.from({ length: 15 }, (_, i) => ({
      id: `oak-${i + 1}`,
      name: `Oak ${i + 1}`,
      location: 'Oak',
      number: i + 1,
      members: [],
      createdAt: new Date(),
      isActive: true
    }))
  },
  {
    id: 'la',
    name: 'LA',
    fullName: 'Los Angeles',
    cohortCount: 6,
    cohorts: Array.from({ length: 6 }, (_, i) => ({
      id: `la-${i + 1}`,
      name: `LA ${i + 1}`,
      location: 'LA',
      number: i + 1,
      members: [],
      createdAt: new Date(),
      isActive: true
    }))
  },
  {
    id: 'lb',
    name: 'LB',
    fullName: 'Long Beach',
    cohortCount: 0,
    cohorts: []
  },
  {
    id: 'phili',
    name: 'Phili',
    fullName: 'Philadelphia',
    cohortCount: 0,
    cohorts: []
  },
  {
    id: 'baltimore',
    name: 'Baltimore',
    fullName: 'Baltimore',
    cohortCount: 1,
    cohorts: [{
      id: 'baltimore-1',
      name: 'Baltimore 1',
      location: 'Baltimore',
      number: 1,
      members: [],
      createdAt: new Date(),
      isActive: true
    }]
  },
  {
    id: 'chicago',
    name: 'Chicago',
    fullName: 'Chicago',
    cohortCount: 2,
    cohorts: Array.from({ length: 2 }, (_, i) => ({
      id: `chicago-${i + 1}`,
      name: `Chicago ${i + 1}`,
      location: 'Chicago',
      number: i + 1,
      members: [],
      createdAt: new Date(),
      isActive: true
    }))
  },
  {
    id: 'miami',
    name: 'Miami',
    fullName: 'Miami',
    cohortCount: 0,
    cohorts: []
  },
  {
    id: 'detroit',
    name: 'Detroit',
    fullName: 'Detroit',
    cohortCount: 2,
    cohorts: Array.from({ length: 2 }, (_, i) => ({
      id: `detroit-${i + 1}`,
      name: `Detroit ${i + 1}`,
      location: 'Detroit',
      number: i + 1,
      members: [],
      createdAt: new Date(),
      isActive: true
    }))
  }
];

export const getAllCohorts = (): Cohort[] => {
  return cohortLocations.flatMap(location => location.cohorts);
};

export const getCohortById = (id: string): Cohort | undefined => {
  return getAllCohorts().find(cohort => cohort.id === id);
};

export const getCohortsByLocation = (locationId: string): Cohort[] => {
  const location = cohortLocations.find(loc => loc.id === locationId);
  return location ? location.cohorts : [];
};