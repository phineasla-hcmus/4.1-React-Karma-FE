/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useRef } from 'react';

/**
 * https://stackoverflow.com/questions/60939736/prevent-react-router-from-accessing-directly-an-url-without-navigating
 */

const LocationContext = createContext({} as any);

export function LocationContextProvider({ children }: any) {
  const lastVisitedLocation = useRef(null);

  function registerLocation(location: any) {
    lastVisitedLocation.current = location;
  }

  return (
    <LocationContext.Provider value={{ registerLocation, lastVisitedLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationContext;
