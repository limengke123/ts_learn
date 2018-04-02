import * as React from 'react'
const classnames = require('classnames')

import {ButtonSize} from './button'

export interface ButtonGroupProps {
    size?:ButtonSize
    style?:React.CSSProperties
    className?:string
    prefixCls?:string
}

const ButtonGroup : React.SFC<ButtonGroupProps> = (props) =>{
    const {prefixCls = 'ant-btn-group', size, className, ...others} = props

    let sizeCls = ""
    switch (size){
        case "large":
            sizeCls = "lg"
            break;
        case "small":
            sizeCls = "sm"
            break;
        default:
            break;
    }

    const classes = classnames(prefixCls,{
        [`${prefixCls}-${sizeCls}`]:sizeCls
    },className)

    return <div {...others} className={classes}/>
}

export default ButtonGroup