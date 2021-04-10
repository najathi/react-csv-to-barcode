import React from "react";
import { useBarcode } from "@createnextapp/react-barcode";

import styles from "./Barcode.module.scss";

const Barcode: React.FC<BarcodeProps> = (props) => {

    const { barcode } = props;

    const { inputRef } = useBarcode({
        value: barcode,
        options: {
            background: '#ffffff',
        }
    });

    return (

        <svg ref={inputRef} />

    );
};

interface BarcodeProps {
    [key: string]: any;
}

export default Barcode;
