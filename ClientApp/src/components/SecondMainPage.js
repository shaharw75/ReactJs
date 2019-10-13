import React, { Component } from 'react';

export default class SecondMainPage extends Component {

    render() {


        return (
            <div>
                This is the second main page, id: {this.props.match.params.id}
            </div>
        )
    }

}