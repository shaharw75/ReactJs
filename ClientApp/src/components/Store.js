import { decorate, observable, action, computed, autorun } from 'mobx';

class Store {

   data = {
        'somethingToBeChanged': '',
        'test': true,
        'mood': 'feels good',
        'productsData': [],
        'productsListKey': Math.random() * 1000,
        'modalGeneralShow': 'none',
        'modalGeneralContent': '',
        'modalWarningShow': 'none',
        'modalWarningContent': ''
    };

    addProduct(e) {
        this.data.productsData.push(e);
    }

    updateProduct(id, product) {
        let row = this.data.productsData.find(x => x.id === id);
        row = product;
    }

    removeProduct(id) {
        this.data.productsData.filter(x => x.id === id);
    }

    updateData(obj, value) {
        this.data.set(obj, value);
    }

}

decorate(Store, {
    data: observable,
    addProduct: action,
    updateProduct: action,
    removeProduct: action,
    updateData: action
});

export default Store;

