import React, { Component, useEffect } from 'react';
import axios from 'axios';
import Wrapper from './Wrappers';
import PropTypes from 'prop-types';
import { modalHandler } from './Modals';
import { inject, observer, Observer } from 'mobx-react';

//Make Jquery to work
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const hostName = "https://localhost:44386";


let Pages =  inject("appStore")(observer(() =>  {


        console.log("RENDER PAGES");
        return (
            <React.Fragment>

                This is the welcome page
                < br />
                <br />
                <MemoFirstPage value="nothing1" />


                <SecondPage value="nothing2" />
                <br />
                {this.appStore.data.productsListKey}

                <ProductsList key={this.appStore.data.productsListKey} />



            </React.Fragment>
        )



}));


const FirstPage = inject('appStore')(observer(({ props }) => {

    const appStore = this.props.appStore;
    //execute after render happens
    useEffect(() => {
        console.log("first page loaded");

    });

    return (


        <div className="greenBg">
            This is the FIRST page {props.value}
            {this.appStore.data.test ? "YES!" : "NO!"}
        </div>


    );

}));

const MemoFirstPage = React.memo(FirstPage);


const SecondPage = inject("appStore")(observer(class SecondPage extends Component {

    constructor(props) {
        super(props);
        const appStore = this.props.appStore;
        appStore.data.somethingToBeChanged = this.props.value;
    }

    changeState = (newValue) => {
        this.appStore.updateData("somethingToBeChanged", newValue);
    };

    inputChangedHandler = (event) => {
        this.appStore.updateData("somethingToBeChanged", event.target.value);
    }

    componentWillUnmount() {
        console.log("Second page unmounted");
    }

    getProductsData = () => {
        var data = this.appStore.data.productsData;
        modalHandler("general", "productsSum", data);
    };

    openSecondPage(id) {
        //const history = createBrowserHistory({ basename: '/' });
        //history.push('/second/' + id);
    }

    render() {

        return (


            <div className="blueBg">

                This is the SECOND page {this.props.value}
                <br />
                {this.appStore.data.somethingToBeChanged}
                <br />

                <button onClick={() => this.getProductsData()}>popup1</button>
                <button onClick={() => modalHandler("warning", null, null)}>popup2</button>
                <button onClick={() => this.openSecondPage(1)} >Open secondMainPage</button>
                <br />
                <input id="inp" type="text" onChange={this.inputChangedHandler} />

                <br />
                {this.appStore.data.test != null ? "YES" : "NO"}
                <br />
                {this.appStore.data.mood}


            </div>

        )
    };

}));


const ProductsList = inject("appStore")(observer(class ProductsList extends Component {

    static prevState = "";
    static prevKey = "";

    constructor() {
        super();
        const appStore = this.props.appStore;
    }

    componentDidMount() {
        console.log("ProductsList didMount: fetching data");
        axios.get(hostName + "/api/products/getAllProducts")
            //  .then(response => response.json())
            .then(response => {
                this.prevState = JSON.stringify(this.appStore.data.productsData);
                this.appStore.data.productsData = response.data;
            });

    }

    componentWillUnmount() {
        console.log("ProductsList unmounted");

    }

    // Execute whenever the component is being updated before render
    // shouldComponentUpdate() {
    //
    //     var check = this.prevState !== JSON.stringify(this.appStore.data.productsData);
    //     console.log("ProductsList do update: " + check);
    //     console.log(this.prevState);
    //     console.log(JSON.stringify(this.appStore.data.productsData));
    //     return check;
    //
    // }

    onChangeProductHandler = (event) => {
        console.log("onchangeProduct");
        const index = event.target.attributes.getNamedItem('index').value;
        const field = event.target.attributes.getNamedItem('field').value;
        var rows = this.appStore.data.productsData;
        this.prevState = JSON.stringify(rows);

        switch (field) {
            case "name":
                rows[index].name = event.target.value;
                break;
            case "price":
                rows[index].price = Number(event.target.value);
                break;
        }


        if (this.prevState !== JSON.stringify(rows)) {
            this.appStore.updateData("productsData", rows);
        }

    };

    onDeleteProductHandler = (event) => {

        const index = event.target.attributes.getNamedItem('index').value;
        var rows = this.appStore.data.productsData;
        this.prevState = JSON.stringify(rows);
        var id = rows[index].id;

        console.log(index);
        console.log(id);
        console.log(JSON.stringify(rows));
        rows.splice(index, 1);
        console.log(rows);

        this.appStore.updateData("productsData", rows);
        axios.get(hostName + "/api/products/deleteProduct?id=" + id);

    };


    submitToServer = () => {

        axios.post(hostName + "/api/products/updateProducts", JSON.stringify(this.appStore.data.productsData), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {

            modalHandler("general", "example3", null);

        });

    };

    addProduct = () => {


        var name = $("#newProductName");
        var price = $("#newProductPrice");

        var data = { 'name': name.val(), 'price': price.val() };

        console.log("Add product: " + JSON.stringify(data));

        axios.post(hostName + "/api/products/addProduct", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(() => {
            this.appStore.updateData("productListKey", Math.random() * 1000);
            modalHandler("general", "example2", null);
        });

        name.val("");
        price.val("");
    };

    render() {
        var check = this.prevState !== JSON.stringify(this.appStore.data.productsData);
        if(!check)return (null);
        
        let dataList = this.appStore.data.productsData;
        console.log(this.prevState + "!");
        console.log(JSON.stringify(dataList));
        console.log((this.prevState === undefined || JSON.stringify(dataList) === this.prevState) + " --> dont render productsList");

        // if (this.prevState === undefined || JSON.stringify(dataList) === this.prevState && this.prevState.length > 0) return (null);

        this.prevKey = this.appStore.data.productsListKey;
        if (dataList.length === 0) return (null);
        this.prevState = JSON.stringify(dataList);

        console.log("Products list render - length" + dataList.length);
        const products = dataList.map((item, index) => {
            return <ProductItem key={item.id} index={index} data={item} changed={this.onChangeProductHandler} delete={this.onDeleteProductHandler} />;
        });

        let titles = [];

        for (var i = 0; i < dataList.length; i++)
            titles.push(<div key={dataList[i].id}>{dataList[i].name}</div>);

        return (

            <React.Fragment>

                {titles}

                < br />
                <br />
                <input type="text" id="newProductName" />& nbsp;
        <input type="number" id="newProductPrice" /> & nbsp;
        <button onClick={() => this.addProduct()}>Add Product</button>
                <br />
                <br />
                <div id="productList">
                    {products}
                </div>
                {new Date().toString()}
                <br />
                <br />
                <button onClick={this.submitToServer}>Submit to server</button>
                <br />
                <br />

                {this.appStore.data.test ? "YES" : "NO"}

                <br />

                {this.appStore.data.mood}

            </React.Fragment>
        )
    };

}));


const ProductItem = inject("appStore")(observer(class ProductItem extends Component {

    constructor(props) {
        super(props);
        const appStore = this.props.appStore;
    }

    componentWillUnmount() {
        console.log("Person " + this.props.data.name + " unmounted");
        // console.log(this.context);
    }

    render() {
        console.log("Person " + this.props.data.id + " mounted");

        return (
            <Wrapper type="bgYellow" subType="dark" id={'product' + this.props.data.id}>
                <input type="text" field="name" index={this.props.index} defaultValue={this.props.data.name} onBlur={this.props.changed} />&nbsp;
                <input type="text" field="price" index={this.props.index} defaultValue={this.props.data.price} onBlur={this.props.changed} />&nbsp;
                <button onClick={this.props.delete} index={this.props.index}> Remove</button>

                {this.appStore.data.test ? "YES" : "NO"}


                <button onClick={() => this.appStore.updateData('mood', 'I like ' + this.props.data.name)}>Update Mood with product</button>

            </Wrapper>
        )
    };
}));



//ProductItem props validation for the developer
ProductItem.propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    changed: PropTypes.func,
    delete: PropTypes.func
};

export default Pages