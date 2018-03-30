import * as React from 'react'

import Icon from './icon/index'

import ErrorBoundaries from './errorBoundaries'


export default class App extends React.Component<{}, {}> {
    render(){
        return (
            <ErrorBoundaries>
                <div>
                    <Icon type="link"/>
                </div>
            </ErrorBoundaries>
        )
    }
}