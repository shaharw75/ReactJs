import React, { Component } from 'react';

export const StateContext = React.createContext({});


export class StateProvider extends Component {

    constructor(props) {
        super(props);
        //  console.log("StateProvider currentPage:" + props.currentPage);
        this.state = {
            'test': true,
            'mood': 'feels good',
            'productsData': [],
            'productsListKey': Math.random() * 1000,
            'modalGeneralShow': 'none',
            'modalGeneralContent': '',
            'modalWarningShow': 'none',
            'modalWarningContent': '',
            updateState: (obj, value) => { this.setState({ [obj]: value }); }

        }
    }

    render() {
        return (
            <StateContext.Provider value={this.state}>
                {this.props.children}
            </StateContext.Provider>
        )
    }

}