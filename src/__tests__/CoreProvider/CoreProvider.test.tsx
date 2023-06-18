import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {WBProvider} from '../../CoreProvider/WBProvider';
import {useDispatch, useServiceFactory, useState} from '../../Hooks/Hooks';
import {Reducer} from '../../Data/Reducer';
import {Action} from '../../Data/Action';

describe('CoreProvider', () => {
    it('should render children', () => {
        render(
            <WBProvider createServiceFactory={jest.fn()} reducers={[]} initialState={{}}>
                <h1>Test Component</h1>
            </WBProvider>,
        );
        expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('should use initial state', () => {
        function InnerComponent() {
            const state = useState<{value: string}>();
            return <h1 role="alert">{state.value}</h1>;
        }

        render(
            <WBProvider createServiceFactory={jest.fn()} reducers={[]} initialState={{value: 'initial value'}}>
                <InnerComponent />
            </WBProvider>,
        );
        expect(screen.getByRole('alert')).toHaveTextContent('initial value');
    });

    it('should use dispatch and reducers', async () => {
        const actionType = 'test';
        const getAction = () => ({type: actionType, payload: {value: 'new value'}});

        function InnerComponent() {
            const state = useState<{value: string}>();
            const dispatch = useDispatch();
            return (
                <div>
                    <button type="button" onClick={() => dispatch(getAction())}>
                        Update State
                    </button>
                    <h1 role="alert">{state.value}</h1>
                </div>
            );
        }

        const reducer: Reducer<object, Action<string, object>> = (state, action) => {
            if (action.type === actionType) {
                return {...state, ...action.payload};
            }
            return state;
        };

        render(
            <WBProvider createServiceFactory={jest.fn()} reducers={[reducer]} initialState={{value: ''}}>
                <InnerComponent />
            </WBProvider>,
        );

        await userEvent.click(screen.getByText('Update State'));
        expect(screen.getByRole('alert')).toHaveTextContent('new value');
    });

    it('should use service factory', async () => {
        const serviceFactory = {
            createService: jest.fn(),
        };

        function InnerComponent() {
            const sf = useServiceFactory<typeof serviceFactory>();
            return (
                <button type="button" onClick={() => sf.createService()}>
                    Action
                </button>
            );
        }

        render(
            <WBProvider createServiceFactory={() => serviceFactory} reducers={[]} initialState={{}}>
                <InnerComponent />
            </WBProvider>,
        );

        await userEvent.click(screen.getByText('Action'));
        expect(serviceFactory.createService).toHaveBeenCalled();
    });

    it('should return default dispatch function when useDispatch used outside of CoreProvider', () => {
        function InnerComponent() {
            const dispatch = useDispatch();
            expect(() => dispatch({type: 'test', payload: {}})).toThrowError(
                'DispatchContext.Provider not found in component tree',
            );
            return <h1>Testing</h1>;
        }

        render(<InnerComponent />);
    });
});
