import React from 'react';
import {useServiceFactory} from '../../Hooks/Hooks';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
}));

describe('Hooks', () => {
    it('should throw error when useServiceFactory used outside Core Provider', () => {
        (React.useContext as jest.Mock).mockReturnValue(undefined);
        expect(() => useServiceFactory()).toThrowError('cannot resolve service factory');
    });
});
