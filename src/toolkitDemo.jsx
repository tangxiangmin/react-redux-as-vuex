import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./toolkit";
import React from "react";
import {increment, decrement,incrementAsync} from './toolkit/module/counter'

const Demo = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (<div>
        <button onClick={() => {
            dispatch(decrement())
        }}>decrement
        </button>
        count:{count}
        <button onClick={() => {
            dispatch(increment())
        }}>increment
        </button>
        <button onClick={() => {
            dispatch(incrementAsync(1))
        }}>incrementAsync
        </button>
    </div>)
}

const page = () => (
    <Provider store={store}>
        <Demo/>
    </Provider>)

export default page
