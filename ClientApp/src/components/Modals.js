import React, { Component } from 'react';
import '../css/modals.css';
import { inject, observer } from 'mobx-react';


//Make Jquery to work
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export let Modals = inject("appStore")(observer(  Modals = () => {


        return (
            <React.Fragment>
                <ModalGeneral show={this.appStore.data.modalGeneralShow} msg={this.appStore.data.modalGeneralContent} />
                <ModalWarning show={this.appStore.data.modalWarningShow} msg={this.appStore.data.modalWarningContent} />
            </React.Fragment>
        )

}));

const ModalGeneral = (props) => {

    console.log("RENDER ModalGeneral");

    return (

        <div style={{ display: props.show }} id="modalGeneral" className="modalGeneral" onClick={() => modalClose('modalGeneral')}>
            <div className="icon">!</div>
            <div className="text">
                <div id="modalGeneralBody">
                    {props.msg}
                </div>
            </div>`
            <div className="msg">
                [לחץ על שטח החלון לסגירה]
            </div >
        </div >

    )
};

const ModalWarning = (props) => {


    console.log("RENDER ModalWarning");

    return (

        <div style={{ display: props.show }} id="modalWarning" className="modalWarning" onClick={() => modalClose('modalWarning')}>
            <div className="icon">!!!</div>
            <div className="text">
                <div id="modalWarningBody">


                    {props.msg}

                </div>
            </div>`
            <div className="msg">
                [לחץ על שטח החלון לסגירה]
            </div >
        </div >

    )
};


const modalClose = inject('appStore')(observer(({ appStore, which }) => {

    console.log("modalClose: " + which);
    $('#' + which).hide('slow');


    appStore.updateData(which + "Show", "none");

}));

export const modalHandler = inject('appStore')(observer(({ appStore, type, subType, data }) => {

    console.log("modalHandler: " + type + " - " + subType);


    let msg = null;
    switch (type) {

        case "general":

            switch (subType) {
                case "productsSum":
                    msg = MessageTemplate(subType, data);
                    break;
                case "example2":
                    msg = "הפריט נוסף בהצלחה";
                    break;
                case "example3":
                    msg = "הפריטים עודכנו בהצלחה";
                    break;
            }

            appStore.updateData("modalGeneralShow", "block");
            appStore.updateData("modalGeneralContent", msg);
            break;

        case "warning":
            msg = "אזהרה";

            appStore.updateData("modalWarningShow", "block");
            appStore.updateData("modalWarningContent", msg);
            break;

    }

}));

const MessageTemplate = (subType, data) => {

    console.log("messageTemplate run : " + subType);

    switch (subType) {

        case "productsSum":

            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                sum = sum + Number(data[i].price);
            }
            return "סך כל הפריטים הינו: " + sum;
    }
};
