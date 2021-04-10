import React, { Fragment, useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi';

import styles from "./BarcodeScreen.module.scss";

import Barcode from "src/elements/Barcode/Barcode";

const BarcodeScreen: React.FC<BarcodeScreenProps> = (props) => {

    const { handleSettings, selectedRow } = props;

    const handleBack = useCallback(() => {
        handleSettings(false);
    }, []);

    return (

        <div className="container">

            <div className={styles.wrapper}>

                <div
                    className={styles.backIcon}
                    onClick={handleBack}
                >
                    <BiArrowBack />
                </div>

                <div className="row">

                    {(selectedRow || []).map((item: any, index: number) => (
                        <Fragment key={index}>
                            <Barcode barcode={item.Barcode} />
                        </Fragment>
                    ))}

                </div>

            </div>

        </div>

    );
};

interface BarcodeScreenProps {
    [key: string]: any;
}

export default BarcodeScreen;
