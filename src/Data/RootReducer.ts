import {Action} from "./Action";

export type Reducer<TState , TAction extends Action<any, any>> = (state: TState, action: TAction) => TState;

export function buildRootReducer<TState>(reducers: Reducer<TState,Action<any, any>>[] = []): Reducer<TState , Action<any, any>> {
    return (state, action) => {
        return reducers.reduce(((state, reduce) => reduce(state, action)), state);
    };
}
