export const polar = (props) => {
    class PolarContainer extends HTMLElement {
        constructor() {
            super()

            let state = {}

            if (props.props) {
                for (const att of Object.keys(props.props)) {
                    state[att] = this.getAttribute(att)
                }
            }

            if (props.start) {
                const newState = props.start(state)
                this.state = {
                    ...state,
                    ...newState
                }
            } else {
                this.state = state
            }

            this.shadow = this.attachShadow({ mode: 'open' })

            if (props.handlers) {
                for (const hkey of props.handlers) {
                    this.handlers[hkey.name] = () => hkey(this.state)
                }
            }

            this.render()

            if (props.listeners) {
                this.setupListeners()
            }

            if (props.events) {
                this.setupEvents()
            }
        }

        handlers = {}
        unsublist = []
        disconnectedCallback() {
            for (const unsub of this.unsublist) {
                unsub()
            }
        }

        setupListeners() {
            for (const l of props.listeners) {
                const unsub = l(this.shadow, this.state)
                this.unsublist.push(unsub)
            }
        }

        setupEvents() {
            for (const event of props.events) {
                event(this.shadow, this.state, this.dispatchEvent)
            }
        }

        render() {
            const regex = /@click={(.*?)}/g
            const html = props.render(this.state)
            const result = html.replace(regex, (m) => {
                const content = m.split(/@click={|}/).filter(Boolean)[0]
                return `onclick="this.getRootNode().host.handlers.${content}()"`
            })

            this.shadow.innerHTML = result
        }
    }
    customElements.define(props.name, PolarContainer)
    return props.name
}
