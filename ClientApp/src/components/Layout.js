import React, { Component } from 'react';
import Pages from '../components/Pages';
import SecondMainPage from './SecondMainPage';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'


export default class Layout extends Component {



    //shouldComponentUpdate() {

    //    return this.firstRun;
    //}

    render() {

        //this.firstRun = false;
        console.log("LAYOUT RENDER ");

        return (
            <div id="layout">

                <BrowserRouter>
                    <React.Fragment>

                        <div className="header">

                            <nav>

                                <Link to="/" className="link">Main Page</Link>

                                <Link to="/second/1" className="link">Second Page</Link>

                            </nav>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {Math.floor((Math.random() * 1000) + 1)}

                        </div>

                        <main>
                            <Switch>
                                <Route path="/" exact component={Pages} />
                                <Route path="/second/:id" component={SecondMainPage} />
                            </Switch>
                        </main>

                        <div className="footer">
                            The Footer
                        </div>

                    </React.Fragment>
                </BrowserRouter>

            </div>

        )
    }
}
