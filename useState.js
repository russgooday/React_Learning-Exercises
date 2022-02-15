const React = (() => {
  // states will be stored in an array
  // guaranteeing that each call to useState returns
  // with a reference to its own distinct state
  const state = []
  let index = 0

  const useState = (initVal) => {
    state[index] = state[index] ?? initVal
    // Note: React.render resets the outer index to 0
    // To make sure when setState is invoked it uses
    // the correct index it is provided with a local copy.
    const localIndex = index
    const setState = (val) => { state[localIndex] = val }

    // return state, incrementing index each time
    return [state[index++], setState]
  }

  const render = (Component) => {
    const component = Component()
    component.render()
    // reset index to 0 on each render
    index = 0
    return component
  }

  return { useState, render }
})()

const Component = (props) => {
  const [count, setCount] = React.useState(0)
  const [text, setText] = React.useState('apple')

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word)
  }
}

let App = React.render(Component)
// { count: 0, text: 'apple'}

App.type('pear')
App = React.render(Component)
// { count: 0, text: 'pear'}

App.click()
App = React.render(Component)
// { count: 1, text: 'pear'}
