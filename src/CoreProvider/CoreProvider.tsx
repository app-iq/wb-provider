import React, { useEffect, useMemo, useReducer } from 'react';
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
    initialState: unknown;
}

export const CoreProvider: React.FC<CoreProviderProps> = props => {
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
                <ServiceContext.Provider value={sf}>{props.children}</ServiceContext.Provider>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
};
