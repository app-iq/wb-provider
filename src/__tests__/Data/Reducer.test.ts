import {buildRootReducer} from '../../Data/Reducer';

describe('Reducer', () => {
    describe('buildRootReducer', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const createReducer = (actionType: string, keyToUpdate: string): any => {
            return (state: object, action: {type: string; payload: string}) => {
                if (actionType === action.type) {
                    return {
                        ...state,
                        [keyToUpdate]: action.payload,
                    };
                }
                return state;
            };
        };

        const createAction = (type: string, payload: string) => ({
            type,
            payload,
        });

        it('should update state based on reducers', () => {
            const reducer = buildRootReducer([
                createReducer('ACTION_1', 'value'),
                createReducer('ACTION_2', 'value'),
                createReducer('ACTION_3', 'value'),
            ]);
            let state = reducer({value: 'initial'}, createAction('ACTION_1', 'value 1'));
            expect(state).toEqual({value: 'value 1'});
            state = reducer(state, createAction('ACTION_2', 'value 2'));
            expect(state).toEqual({value: 'value 2'});
            state = reducer(state, createAction('ACTION_2', 'value 3'));
            expect(state).toEqual({value: 'value 3'});
        });

        it('should not update state if action type is not handled', () => {
            const reducer = buildRootReducer([createReducer('ACTION_1', 'value'), () => undefined]);
            let state = reducer({value: 'initial'}, createAction('ACTION_1', 'value'));
            expect(state).toEqual({value: 'value'});
            state = reducer(state, createAction('NOT_EXISTED_ACTION', 'TEST VALUE'));
            expect(state).toEqual({value: 'value'});
        });
    });
});
