import React, { Fragment, useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { TiPrinter } from 'react-icons/ti';
import Button from "react-bootstrap/esm/Button";

import styles from "./BarcodeScreen.module.scss";

import Barcode from "src/elements/Barcode/Barcode";

const BarcodeScreen: React.FC<BarcodeScreenProps> = (props) => {

    const { handleSettings, selectedRow, count } = props;

    const data = (selectedRow || [])
        .map((item: any) => {

            let res = [];

            for (let i = 0; i < count; i++) {
                res.push(item);
            }

            return [...res];
        });

    console.log('data', data);

    const handleBack = useCallback(() => {
        handleSettings(false);
    }, []);

    const handlePrintLabel = useCallback(() => {
        window.print();
    }, []);

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

            <div>

                <p>Products: <strong>{selectedRow.length}</strong></p>
                <p>No. copies: <strong>{count}</strong></p>
                <p>Total copies: <strong>{+count * selectedRow.length}</strong></p>
                <br />

            </div>

            <div className="row">

                {(data || []).map((item: any, index: number) => (

                    <Fragment key={index}>

                        {item.map((element: any, key: number) => (

                            <Fragment key={key}>

                                <Barcode barcode={element.Barcode} />

                            </Fragment>

                        ))}

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
