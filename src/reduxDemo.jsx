import {connect, Provider, useDispatch, useSelector} from "react-redux";
import React from "react";
import {createStore} from "redux";


const ADD_COUNT = "ADD_COUNT"

const initState = {
    count: 0
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_COUNT:
            return {...state, count: action.payload}
        default:
            return state
    }
}

const store = createStore(reducer, initState)

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const Counter = connect(mapStateToProps)(({count, dispatch}) => {
    const add = () => {
        dispatch({type: ADD_COUNT, payload: count + 1})
    }
    return (<div>
        connect: <button onClick={add}>click {count}</button>
    </div>)
})

const Counter2 = () => {
    const count = useSelector((state) => state.count)
    const dispatch = useDispatch()
    const add = () => {
        dispatch({type: ADD_COUNT, payload: count + 1})
    }
    return (<div>
        hooks: <button onClick={add}>click {count}</button>
    </div>)
}

const Demo = () => {
    return (<Provider store={store}>
        <Counter/>
        <Counter2/>
    </Provider>)
}
export default Demo
