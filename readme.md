# Polar Components

## Components

| Component | Code                                     |
| --------- | ---------------------------------------- |
| Button    | [Code](./components/Button/component.js) |
| Input     | [Code](./components/Input/component.js)  |
| Canvas    | [Code](./components/Canvas/component.js) |
| Chat      | [Code](./components/Chat/component.js)   |

## Components Build Script

```js
import fs from 'fs'

async function main() {
    const url = (comp) =>
        `https://raw.githubusercontent.com/rise-cli/polar-components/main/components/${comp}/component.js`

    const componentList = ['Button', 'Input', 'Canvas', 'Chat'].map(url)

    let result = ''
    for (x of componentList) {
        const code = await fetch(x)
        result = result + code
    }

    const path = process.cwd() + '/webcomponents.js'
    fs.writeFileSync(path, result)
}

main()
```

## Container

[Polar Container](./container/container.js) is a thn abstraction over the class syntax for building web components.
