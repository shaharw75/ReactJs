import React from 'react'

//Use to wrap content when render, good as a template for reusing the same code
const Wrapper = (props) => {

    switch (props.type) {

        case "bgYellow":
        default:

            switch (props.subType) {
                default:
                case "light":
                    return (
                        <div style={{ backgroundColor: 'yellow' }} id={props.id}>
                            {props.children}
                        </div>
                    )

                case "dark":
                    return (
                        <div style={{ backgroundColor: 'orange' }} id={props.id}>
                            {props.children}
                        </div>
                    )

            }

        case "bgGreen":
            return (
                <div style={{ backgroundColor: 'green' }} id={props.id}>
                    {props.children}
                </div>
            )
    }

}

export default Wrapper
