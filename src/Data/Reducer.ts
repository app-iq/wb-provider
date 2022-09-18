import {Action} from './Action';

export type Reducer<TState, TAction extends Action<unknown, unknown>> = (state: TState, action: TAction) => TState;

export function buildRootReducer<TState>(reducers: Reducer<TState, Action<unknown, unknown>>[] = []): Reducer<TState, Action<unknown, unknown>> {
    return (state, action) => {
        const allReducers: Reducer<TState, Action<unknown, unknown>>[] = reducers.concat(reducers);
        return allReducers.reduce(((state, reduce) => {
            const newState = reduce(state, action);
            if (newState === undefined) {
                return state;
            }
            return newState;
        }), state);
    };
}
