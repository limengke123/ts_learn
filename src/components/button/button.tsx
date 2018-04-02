import * as React from 'react'
import {findDOMNode} from 'react-dom'

const PropTypes = require('prop-types')
const classnames = require('classnames')
const omit = require('omit').default

import Icon from '../icon'
import Group from './button-group'

const rxTwoCNChar = /^[\u4e00-\u9a5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

function isString(str:any){
    return typeof str === 'string'
}

//两个中文之间插入空格...
function insertSpace(child:React.ReactChild,needInserted:boolean){
    if(child == null){
        return
    }
    const space = needInserted ? " " : ""
    if(typeof child !== "string" && typeof child !== "number" && isString(child.type) && isTwoCNChar(child.props.children)){

    }
}
