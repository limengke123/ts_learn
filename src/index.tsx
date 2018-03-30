import * as React from 'react'
import * as ReactDom from 'react-dom'

import Hello from './components/Hello'


const root = document.createElement('div')

document.body.appendChild(root)

ReactDom.render(
    <Hello name="typescript" enthusiasmLevel={10}/>,
    root as HTMLElement
)