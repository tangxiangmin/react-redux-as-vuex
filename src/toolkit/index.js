import {configureStore} from '@reduxjs/toolkit'

import counterReducer from './module/counter'

export default configureStore({
    reducer: {
        counter: counterReducer
    },
})
