import React, { ReactElement, useEffect, useMemo, useReducer } from 'react';
import { Action } from '../Data/Action';
import { buildRootReducer, Reducer } from '../Data/Reducer';
import { DispatchContext, DispatchFunction } from '../Context/DispatchContext';
import { ServiceContext } from '../Context/ServiceContext';
import { StateContext } from '../Context/StateContext';

export interface CoreProviderProps {
    createServiceFactory: (dispatch: DispatchFunction, state: unknown, props: CoreProviderProps) => unknown;
    dispatchCallback?: (dispatch: DispatchFunction) => void;
    stateCallback?: (state: unknown) => void;
    reducers: Reducer<any, Action<any, any>>[];
    initialState:unknown;
}

export interface WithCoreProviderProps {
    dispatch: DispatchFunction;
    state: unknown;
}

export function withCoreProvider(Component: React.ComponentType<WithCoreProviderProps>) {
    return function WBoxProvider(props: CoreProviderProps) {
        const reducer = useMemo(() => buildRootReducer(props.reducers ?? []), [props.reducers]);
        const [state, dispatch] = useReducer(reducer, props.initialState);
        const sf = useMemo(() => {
            return props.createServiceFactory(dispatch, state, props);
        }, [state, dispatch, props]);

        const getDispatch = props.dispatchCallback;
        const getState = props.stateCallback;
        useEffect(() => getDispatch?.(dispatch), [getDispatch, dispatch]);
        useEffect(() => getState?.(state), [getState, state]);

        return (
            <DispatchContext.Provider value={dispatch}>
                <StateContext.Provider value={state}>
                    <ServiceContext.Provider value={sf}>
                        <Component dispatch={dispatch} state={state} />
                    </ServiceContext.Provider>
                </StateContext.Provider>
            </DispatchContext.Provider>
        );
    };
}
