// helper function
const notEquals = (source, target) =>
    source.some((prop, i) => !Object.is(prop, target[i]))

const React = (() => {
    const hooks = []
    let index = 0

    const useState = (initVal) => {
        hooks[index] = hooks[index] ?? initVal
        const localIndex = index
        const setState = (val) => { hooks[localIndex] = val }

        return [hooks[index++], setState]
    }

    const useEffect = (effect, currDependencies) => {
        const prevDependencies = hooks[index]
        const hasChanged = (prevDependencies)
            ? notEquals(prevDependencies, currDependencies)
            : true

        if (hasChanged) effect()
        hooks[index] = currDependencies
        index++
    }

    const render = (Component) => {
        const component = Component()
        component.render()
        index = 0
        return component
    }

    return { useState, useEffect, render }
})()

const Component = (props) => {
    const [count, setCount] = React.useState(0)
    const [text, setText] = React.useState('apple')

    React.useEffect(() => {
        console.log(`Current count is ${count}`)
    }, [count])

    return {
        render: () => console.log({ count, text }),
        click: () => setCount(count + 1),
        type: setText
    }
}

let App = React.render(Component)
// Current count is 0
// { count: 0, text: 'apple'}

App.type('pear')
App = React.render(Component)
// count is same - no effect
// { count: 0, text: 'pear'}

App.click()
App = React.render(Component)
// Current count is 1
// { count: 1, text: 'pear'}
