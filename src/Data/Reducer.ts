import {Action} from './Action';

export type Reducer<TState, TAction extends Action<unknown, unknown>> = (state: TState, action: TAction) => TState;

export function buildRootReducer<TState>(
    reducers: Reducer<TState, Action<unknown, unknown>>[],
): Reducer<TState, Action<unknown, unknown>> {
    return (state, action) => {
        return reducers.reduce((accState, reduce) => {
            const newState = reduce(accState, action);
            if (newState === undefined) {
                return accState;
            }
            return newState;
        }, state);
    };
}
