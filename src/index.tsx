import * as React from 'react'
import * as ReactDom from 'react-dom'

import Hello from './components/Hello'

ReactDom.render(
    <Hello name="typescript" enthusiasmLevel={10}/>,
    document.getElementById("example") as HTMLElement
)