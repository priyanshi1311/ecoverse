// src/hooks/useRecommendations.js
import { useContext } from 'react';
import { EcoVerseContext } from '../context/EcoVerseContext';

export const useRecommendations = () => {
  const {
    recommendations,
    appliedRecIds,
    toggleRecommendation
  } = useContext(EcoVerseContext);

  return {
    recommendations,
    appliedRecIds,
    toggleRecommendation,
    appliedCount: appliedRecIds.length
  };
};
