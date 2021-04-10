import React from "react";

import styles from "./BlankScreen.module.scss";

const BlankScreen: React.FC<BlankScreenProps> = (props) => {

    return (

        <div className="container">


        </div>

    );
};

interface BlankScreenProps {
    [key: string]: any;
}

export default BlankScreen;
