import React from 'react';
import { Action } from '../Data/Action';

export type DispatchFunction = (action: Action<any, any>) => void;

const defaultDispatch: DispatchFunction = () => {
    throw new Error('DispatchContext.Provider not found in component tree');
};

export const DispatchContext = React.createContext(defaultDispatch);
export const DispatchProvider = DispatchContext.Provider;
