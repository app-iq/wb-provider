import React, {PropsWithChildren, useMemo, useReducer} from 'react';
import {Action} from '../Data/Action';
import {buildRootReducer, Reducer} from '../Data/Reducer';
import {DispatchContext, DispatchFunction} from '../Context/DispatchContext';
import {ServiceContext} from '../Context/ServiceContext';
import {StateContext} from '../Context/StateContext';

export interface CoreProviderProps {
    createServiceFactory: (dispatch: DispatchFunction, state: unknown, props: CoreProviderProps) => unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducers: Reducer<any, Action<any, any>>[];
    initialState: unknown;
}

export function CoreProvider(props: PropsWithChildren<CoreProviderProps>) {
    const {reducers, initialState, createServiceFactory, children} = props;
    const reducer = useMemo(() => buildRootReducer(reducers ?? []), [reducers]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const sf = useMemo(() => createServiceFactory(dispatch, state, props), [createServiceFactory, state, props]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <ServiceContext.Provider value={sf}>{children}</ServiceContext.Provider>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
}
