import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit'
const classnames = require('classnames')
// import omit from 'omit.js'
const omit = require('omit.js').default

console.log(omit)

export interface IconProps {
    type:string //设置按钮类型，可选值为 primary dashed danger
    className?:string
    title?:string
    onClick?:React.MouseEventHandler<any>
    spin?:boolean
    style?:React.CSSProperties
}

const Icon = (props:IconProps) => {
    const {type, className = "", spin = false} = props
    const classString = classnames({
        action:true,
        'action-spin':spin || type === 'loading',
        [`action-${type}`]:true,
    },className)

    return <i {...omit(props, ['type','spin'])} className={classString}/>
}

export default Icon