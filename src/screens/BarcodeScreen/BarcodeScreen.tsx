import React, { Fragment, useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { TiPrinter } from 'react-icons/ti';
import Button from "react-bootstrap/esm/Button";

import styles from "./BarcodeScreen.module.scss";

import Barcode from "src/elements/Barcode/Barcode";

const BarcodeScreen: React.FC<BarcodeScreenProps> = (props) => {

    const { handleSettings, selectedRow } = props;

    const handleBack = useCallback(() => {
        handleSettings(false);
    }, []);

    const handlePrintLabel = useCallback(() => {

    }, [])

    return (

        <div className="container">

            <div className={styles.wrapper}>

                <div className={styles.header}>

                    <div
                        className={styles.backIcon}
                        onClick={handleBack}
                    >
                        <BiArrowBack />
                    </div>

                    <Button
                        className="text-white"
                        variant="warning"
                        onClick={handlePrintLabel}
                    >
                        <TiPrinter />&nbsp; Print Label
                    </Button>

                </div>

            </div>

            <div className="row">

                {(selectedRow || []).map((item: any, index: number) => (

                    <Fragment key={index}>

                        <Barcode barcode={item.Barcode} />

                    </Fragment>

                ))}

            </div>

        </div>

    );
};

interface BarcodeScreenProps {
    [key: string]: any;
}

export default BarcodeScreen;
