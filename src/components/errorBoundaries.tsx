import * as React from 'react'

export interface Props {
    name?:string
}

export interface State {
    hasError:boolean
}

export default class ErrorBoundaries extends React.Component<Props, State>{
    constructor(props:Props){
        super(props)
        this.state = {
            hasError:false
        }
    }

    componentDidCatch(error:Error,info:Object){
        this.setState({
            hasError:true
        })
        console.log(error)
        console.log(info)
    }

    render(){
        if(this.state.hasError){
            return <h1>something is wrong</h1>
        }

        return this.props.children
    }
}