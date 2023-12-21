import { nodeStore } from './store.mjs'
import { listenKeys, getPath } from './polar-store.mjs'
import { polar } from './polar-components.mjs'
import './components/ActionButton.mjs'
import './components/InventoryCard.mjs'
import './components/Input.mjs'

/**
 * Props
 */
const props = {
    node: 'reactive'
}

/**
 * Store Events
 */
const onStoreColorUpdate = (ui, state) => {
    return listenKeys(nodeStore, [`items.${state.node}.color`], (x, key) => {
        const color = getPath(x, `items.${state.node}.color`)
        ui.querySelector('#addbutton').setAttribute('text', color)
        ui.querySelector('code').textContent = JSON.stringify(x, null, 2)
    })
}

const onStoreInputUpdate = (ui, state) => {
    return listenKeys(nodeStore, [`input`], (x, key) => {
        ui.querySelector('code').textContent = JSON.stringify(x, null, 2)
    })
}

/**
 * UI Events
 */
const onAddClick = (ui, state) => {
    ui.querySelector('#addbutton').addEventListener('click', (v) => {
        nodeStore.setKey(`items.${state.node}.color`, 'Leslie Knope')
    })
}

const onInputChange = (ui, state) => {
    ui.querySelector('#input').addEventListener('input-changed', (v) => {
        nodeStore.setKey(`input`, v.detail.value)
    })
}

/**
 * Render
 */
const render = (state) => {
    const all = nodeStore.get()
    return /*html*/ `
        <wc-add-button
            id='addbutton'
            text="${state.node}"
            icon='add'
        ></wc-add-button>
        <pre>
            <code>
                ${JSON.stringify(all, null, 2)}
            </code>
        </pre>
        <wc-input-text
            id='input'
            submitting='false'
            value='${all.input}'
        ></wc-input-text>
        <wc-inventory-card
            id= 'mocha'
            name= 'Mocha'
            price= '200'
            img='https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'           
        ></wc-inventory-card>  
    `
}

export default polar({
    props,
    name: 'wc-container',
    events: [onStoreColorUpdate, onStoreInputUpdate, onAddClick, onInputChange],
    render
})
