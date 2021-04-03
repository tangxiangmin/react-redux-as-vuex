import {connect, Provider, useSelector} from 'react-redux'
import {store} from './store'
import React from "react";

const Counter = connect(() => ({
    count1: store.state.test.count1,
    doubleCount: store.getters['test/doubleCount'],
}))(({count1, doubleCount}) => {
    const add = () => {
        store.commit('test/setCount1', count1 + 1)
    }

    const addAsync = () => {
        store.dispatch('test/fetchCount1', count1 + 1)
    }

    return (<div>
        <p>
            hello store:state count {count1}, getters doubleCount {doubleCount}
        </p>
        <button onClick={add}>click time{count1}</button>
        <button onClick={addAsync}>async click time{count1}</button>
    </div>)
})

const TodoList = connect(() => ({
    list: store.state.todo.list,
}))(({list}) => {
    const addItem = () => {
        const item = {id: +new Date()}
        store.dispatch('todo/addList', item)
    }
    const removeItem = (item) => {
        store.dispatch('todo/removeItem', item)
    }

    return (<div>
        <button onClick={addItem}>add item</button>
        <ul>
            {
                list.map((item) => (<li key={item.id}>item {item.id}
                    <button onClick={removeItem.bind(null, item)}>remove</button>
                </li>))
            }
        </ul>

    </div>)
})

const HookDemo = () => {
    const count = useSelector(state => state.test.count1)
    return (
        <div>hooks:{count}</div>
    )
}

const page = () => (
    <Provider store={store.reduxStore}>
        <Counter/>
        <HookDemo/>
        <TodoList/>
    </Provider>)

export default page
