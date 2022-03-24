import React, { useCallback } from 'react';
import { Action } from '../Data/Action';
import { Reducer } from '../Data/Reducer';
import { withCoreProvider } from '../HOC/WithCoreProvider';
import { useDispatch, useServiceFactory, useState } from '../Hooks/Hooks';

class ServiceFactory {
    public createDummyService(): { foo: () => void } {
        return {
            foo: () => console.log('bar'),
        };
    }
}

const MyCoolComponent: React.FC = () => {
    return (
        <div>
            <h1>MY COOL COMPONENT</h1>
            <InnerComponent />
            <ValueComponent />
        </div>
    );
};

const WithProvider = withCoreProvider(MyCoolComponent);

const InnerComponent: React.FC = () => {
    const dispatch = useDispatch();
    const state = useState<State>();
    const sf = useServiceFactory<ServiceFactory>();
    const onClick = useCallback(() => {
        const value = window.prompt('Enter value', state.value);
        dispatch(setValue(value ?? ''));
        sf.createDummyService().foo();
    }, [dispatch, state]);
    return <button onClick={onClick}>SET VALUE</button>;
};

const ValueComponent : React.FC = () => {
    const state = useState<State>();
    return <h1>{state.value}</h1>
}

interface State {
    value: string;
}

function setValue(value: string): Action<any, any> {
    return {
        type: 'SET_VALUE',
        payload: value,
    };
}

const reducer: Reducer<State, Action<any, any>> = (state, action) => {
    if (action.type === 'SET_VALUE') {
        return { ...state, value: action.payload };
    }
    return state;
};

export const Example: React.FC = props => {
    const initialState: State = { value: 'initial value' };
    return (
        <WithProvider
            reducers={[reducer]}
            dispatchCallback={dispatch => dispatch(setValue("using dispatch callback"))}
            stateCallback={state => console.log(state)}
            createServiceFactory={() => new ServiceFactory()}
            initialState={initialState}
        />
    );
};
