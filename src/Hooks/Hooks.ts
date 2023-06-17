import {useContext} from 'react';
import {StateContext} from '../Context/StateContext';
import {DispatchContext} from '../Context/DispatchContext';
import {ServiceContext} from '../Context/ServiceContext';

export function useState<TState = unknown>(): TState {
    return useContext(StateContext) as TState;
}

export function useDispatch() {
    return useContext(DispatchContext);
}

export function useServiceFactory<TServiceFactory = unknown>(): TServiceFactory {
    const serviceFactory = useContext(ServiceContext);
    if (!serviceFactory) {
        throw new Error('cannot resolve service factory');
    }
    return serviceFactory as TServiceFactory;
}
