import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('kokan_nirvana_liked_properties');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kokan_nirvana_liked_properties', JSON.stringify(likedIds));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  }, [likedIds]);

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isLiked = (id) => likedIds.includes(id);

  const clearFavorites = () => setLikedIds([]);

  return (
    <FavoritesContext.Provider
      value={{
        likedIds,
        toggleLike,
        isLiked,
        likedCount: likedIds.length,
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
