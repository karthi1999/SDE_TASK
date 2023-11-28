import { configureStore } from '@reduxjs/toolkit';
import directoryReducer from './slices/directory.slice';

const store = configureStore({
    reducer: {
        directoryState: directoryReducer,
    },
});

export * from './actions';
export * from './slices';

export default store;
