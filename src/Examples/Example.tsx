import React, {PropsWithChildren, useCallback} from 'react';
import {Action} from '../Data/Action';
import {Reducer} from '../Data/Reducer';
import {CoreProvider} from '../CoreProvider/CoreProvider';
import {useDispatch, useServiceFactory, useState} from '../Hooks/Hooks';

class ServiceFactory {
    private readonly bar: string = 'bar';

    public createDummyService(): {foo: () => void} {
        return {
            // eslint-disable-next-line no-console
            foo: () => console.log(this.bar),
        };
    }
}

interface State {
    value: string;
}

function setValue(value: string): Action<string, string> {
    return {
        type: 'SET_VALUE',
        payload: value,
    };
}

const reducer: Reducer<State, Action<string, string>> = (state: State, action): State => {
    if (action.type === 'SET_VALUE') {
        return {...state, value: action.payload};
    }
    return state;
};

function MyCoolComponent({children}: PropsWithChildren) {
    const initialState: State = {value: 'initial value'};
    return (
        <CoreProvider
            reducers={[reducer]}
            createServiceFactory={() => new ServiceFactory()}
            initialState={initialState}
        >
            {children}
        </CoreProvider>
    );
}

function InnerComponent() {
    const dispatch = useDispatch();
    const state = useState<State>();
    const sf = useServiceFactory<ServiceFactory>();
    const onClick = useCallback(() => {
        // eslint-disable-next-line no-alert
        const value = window.prompt('Enter value', state.value);
        dispatch(setValue(value ?? ''));
        sf.createDummyService().foo();
    }, [dispatch, sf, state.value]);
    return (
        <button type="button" onClick={onClick}>
            SET VALUE
        </button>
    );
}

function ValueComponent() {
    const state = useState<State>();
    return <h1>{state.value}</h1>;
}

export function Example() {
    return (
        <MyCoolComponent>
            <h1>MY COOL COMPONENT</h1>
            <InnerComponent />
            <ValueComponent />
        </MyCoolComponent>
    );
}
