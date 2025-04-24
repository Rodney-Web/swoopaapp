import {Category, Product} from '../types/types';

export const categories: Category[] = [
  {
    id: null,
    name: 'All',
    icon: 'home',
  },
  {
    id: 'Household',
    name: 'Household',
    icon: 'toggle-switch-off',
  },
  {
    id: 'Clothing',
    name: 'Clothing',
    icon: 'fire',
  },
  {
    id: 'Garden',
    name: 'Garden',
    icon: 'lightning-bolt',
  },
];

export const getIcon = (category: Product['category']) => {
  switch (category) {
    case 'Household':
      return 'toggle-switch-off';
    case 'Clothing':
      return 'fire';
    case 'Garden':
      return 'lightning-bolt';
    default:
      return 'home';
  }
};

export const calculatePostedAt = (postedAt: string) => {
  const postedTime = new Date(postedAt);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - postedTime.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600),
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 3600)) / (1000 * 60),
  );
  if (daysDifference > 0) {
    return `${daysDifference}d ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}h ago`;
  } else {
    return `${minutesDifference}m ago`;
  }
};
