import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [likedIds, setLikedIds] = useState(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const saved = localStorage.getItem('kokan_nirvana_liked_properties');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('kokan_nirvana_liked_properties', JSON.stringify(likedIds));
      }
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  }, [likedIds]);

  const toggleLike = (id) => {
    if (!id) return;
    setLikedIds((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const exists = list.includes(id);
      if (exists) {
        return list.filter((item) => item !== id);
      } else {
        return [...list, id];
      }
    });
  };

  const isLiked = (id) => Array.isArray(likedIds) && Boolean(id) && likedIds.includes(id);

  const clearFavorites = () => setLikedIds([]);

  return (
    <FavoritesContext.Provider
      value={{
        likedIds: Array.isArray(likedIds) ? likedIds : [],
        toggleLike,
        isLiked,
        likedCount: Array.isArray(likedIds) ? likedIds.length : 0,
        drawerOpen,
        setDrawerOpen,
        clearFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
