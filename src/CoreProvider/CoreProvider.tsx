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

export const CoreProvider: React.FC<PropsWithChildren<CoreProviderProps>> = props => {
    const reducer = useMemo(() => buildRootReducer(props.reducers ?? []), [props.reducers]);
    const [state, dispatch] = useReducer(reducer, props.initialState);
    const sf = useMemo(() => props.createServiceFactory(dispatch, state, props), [state, dispatch, props]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <ServiceContext.Provider value={sf}>{props.children}</ServiceContext.Provider>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};
