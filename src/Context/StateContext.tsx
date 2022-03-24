import React from 'react';

export const StateContext = React.createContext<unknown>(undefined as unknown);
export const StateProvider = StateContext.Provider;
