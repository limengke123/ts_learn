import React from 'react'

interface HelloProps {
    compiler: string,
    framework: string
}

const Hello = (props:HelloProps) => (
    <h1>
        hello from {props.complier} and {props.framework}
    </h1>
)

export default Hello