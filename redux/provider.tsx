"use client"

import {Provider} from 'react-redux'
import { store } from './store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

interface Props {children:React.ReactNode}

export function Providers({children}:Props){
    let persistor = persistStore(store)

    return <Provider store={store}>
        <PersistGate persistor={persistor}>
        {children}
        </PersistGate>
        </Provider>;
}
