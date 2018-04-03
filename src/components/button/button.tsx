import * as React from 'react'
import {findDOMNode} from 'react-dom'

const PropTypes = require('prop-types')
const classnames = require('classnames')
const omit = require('omit').default

import Icon from '../icon'
import Group, {default as ButtonGroup} from './button-group'

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
    const SPACE = needInserted ? " " : ""
    if(typeof child !== "string" && typeof child !== "number" && isString(child.type) && isTwoCNChar(child.props.children)){
        return React.cloneElement(child,{},child.props.children.split("").join(SPACE))
    }
    if(typeof child === "string"){
        if(isTwoCNChar(child)){
            child = child.split("").join(SPACE)
        }
        return <span>{child}</span>
    }
    return child
}

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger'
export type ButtonShape = 'circle' | 'circle-outline'
export type ButtonSize = 'small' | 'default' | 'large'

export interface ButtonProps {
    type?:ButtonType
    htmlType?:string
    icon?:string
    shape?:ButtonShape
    size?:ButtonSize
    onClick?:React.FormEventHandler<any>
    onMouseUp?:React.FormEventHandler<any>
    onMouseDown?:React.FormEventHandler<any>
    onKeyPress?:React.KeyboardEventHandler<any>
    onKeyDown?:React.KeyboardEventHandler<any>
    tabIndex?:number
    loading?:boolean | {delay?:number}
    disabled?:boolean
    style?:React.CSSProperties
    prefixCls?:string
    className?:string
    ghost?:boolean
    target?:string
    href?:string
    download?:string
}

export default class Button extends React.Component<ButtonProps,any>{
    static Group:typeof Group
    static __ANT_BUTTON = true

    static defaultProps = {
        prefixCls:'ant-btn',
        loading:false,
        ghost:false
    }

    static propTypes = {
        type:PropTypes.string,
        shape:PropTypes.oneOf(['circle','circle-outline']),
        size:PropTypes.oneOf(['large','default','small']),
        htmlType:PropTypes.oneOf(['submit','button','reset']),
        onClick:PropTypes.func,
        loading:PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
        className:PropTypes.string,
        icon:PropTypes.string,
    }

    timeout:number
    delayTimeout:number

    constructor(props:ButtonProps){
        super(props)
        this.state = {
            loading:props.loading,
            clicked:false,
            hasTwoCNChar:false,
        }
    }

    componentDidMount(){
        this.fixTowCNChar()
    }

    componentDidUpdate(){
        this.fixTowCNChar()
    }

    componentWillUnmount(){
        if(this.timeout){
            clearTimeout(this.timeout)
        }
        if(this.delayTimeout){
            clearTimeout(this.delayTimeout)
        }
    }

    componentWillReceiveProps(nextProps : ButtonProps){
        const currentLoading = this.props.loading
        const loading = nextProps.loading

        if(currentLoading){
            clearTimeout(this.delayTimeout)
        }

        if(typeof loading !== "boolean" && loading && loading.delay){
            this.delayTimeout = window.setTimeout(() => this.setState({loading}),loading.delay)
        } else {
            this.setState({loading})
        }
    }

    fixTowCNChar(){
        const node = (findDOMNode(this) as HTMLElement)
        const buttonText = node.textContent || node.innerText //dom节点文本的获取方式 textContent不常见
        if(this.isNeedInserted() && isTwoCNChar(buttonText)){
            if(!this.state.hasTwoCNChar){
                this.setState({
                    hasTwoCNChar:true
                })
            }
        } else if (this.state.hasTwoCNChar){
            this.setState({
                hasTwoCNChar:false
            })
        }
    }

    handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        this.setState({clicked :true})
        clearTimeout(this.timeout)
        this.timeout = window.setTimeout(() => this.setState({clicked :false}), 500)

        const onClick = this.props.onClick
        if(onClick){
            onClick(e)
        }
    }

    isNeedInserted(){
        const {loading, icon, children} = this.props
        const iconType = loading ? 'loading' : icon
        return React.Children.count(children) === 1 && (!iconType || iconType === 'loading')
    }

    render(){
        const {
            type, shape, size, className, htmlType, children, icon, prefixCls, ghost, ...others,
        } = this.props

        const {loading, clicked, hasTwoCNChar} = this.state

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

        const ComponentProp = others.href ? 'a' : 'button'

        const classes = classnames(prefixCls,className,{
            [`${prefixCls}-${type}`]:type,
            [`${prefixCls}-${shape}`]:shape,
            [`${prefixCls}-${sizeCls}`]:sizeCls,
            [`${prefixCls}-${"icon-only"}`]:!children && icon,
            [`${prefixCls}-${"loading"}`]:loading,
            [`${prefixCls}-${"clicked"}`]:clicked,
            [`${prefixCls}-${"background-ghost"}`]:ghost,
            [`${prefixCls}-${"two-chinese-chars"}`]:hasTwoCNChar,
        })

        const iconType = loading ? 'loading' : icon
        const iconNode = iconType ? <Icon type={iconType} /> : null
        const kids = (children || children === 0)
            ? React.Children.map(children, child => insertSpace(child, this.isNeedInserted())) : null

        return (
            <ComponentProp
                {...omit(others,['loading'])}
                type={others.href ? undefined : (htmlType || 'button')}
                className={classes}
                onClick={this.handleClick}
            >
                {iconNode}{kids}
            </ComponentProp>
        )
    }
}
