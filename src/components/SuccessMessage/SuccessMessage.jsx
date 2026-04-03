import React, { useState } from 'react';
import styles from './SuccessMessage.module.css';

const SuccessMessage = ({ message }) => {
    return (
        <section className={styles.successMessage}>
            {(
                <section className={styles.animation}>
                    <svg className={styles.animate} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z" stroke="#d4af37" fill="transparent" />
                    </svg>
                </section>
            )}
            <div className={styles.successText}>{message}</div>
        </section>
    );
};

export default SuccessMessage;