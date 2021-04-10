import React from "react";

import styles from "./BlankElement.module.scss";

const BlankElement: React.FC<BlankElementProps> = (props) => {

    return (

        <div>
        </div>

    );
};

interface BlankElementProps {
    [key: string]: any;
}

export default BlankElement;
