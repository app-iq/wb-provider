import { Action } from './Data/Action';
import { Reducer } from './Data/Reducer';
import { DispatchContext, DispatchProvider } from './Context/DispatchContext';
import { ServiceContext, ServiceProvider } from './Context/ServiceContext';
import { StateContext, StateProvider } from './Context/StateContext';
import { CoreProviderProps, withCoreProvider, WithCoreProviderProps } from './HOC/WithCoreProvider';
import { useDispatch, useServiceFactory, useState } from './Hooks/Hooks';

export { withCoreProvider };

export type { WithCoreProviderProps, CoreProviderProps };

export { useDispatch, useState, useServiceFactory };

export { StateProvider, ServiceProvider, DispatchProvider };

export { StateContext, DispatchContext, ServiceContext };

export type { Reducer, Action };