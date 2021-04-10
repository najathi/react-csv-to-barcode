import React, { useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi';

import styles from "./BarcodeScreen.module.scss";

const BarcodeScreen: React.FC<BarcodeScreenProps> = (props) => {

    const { handleSettings } = props;

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

            </div>

        </div>

    );
};

interface BarcodeScreenProps {
    [key: string]: any;
}

export default BarcodeScreen;
