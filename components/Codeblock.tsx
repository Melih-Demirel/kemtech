import React from "react";
import styles from "@/styles/codeblock.module.scss";

export const Codeblock = () => {
  return (
    <>
        <div className="flex flex-col items-center">
            <TopOfWindow/>
            <TextWindow/>
        </div>
    </>
  );
};

const TopOfWindow = () => {
    const actionWindow = "bg-zinc-950 border-zinc-800 border-4 relative mx-auto py-3 lg:py-4 border rounded-t-lg w-11/12 md:w-3/4"
    return (
    <>
        <div className={actionWindow}>
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
                <span className={styles.dot + " " +styles.redDot}></span>
                <span className={styles.dot + " " +styles.yellowDot}></span>
                <span className={styles.dot + " " +styles.greenDot}></span>
            </div>
        </div>
    </>
    );
};

const TextWindow = () => {
    const editorWindow = "bg-zinc-900 border-zinc-800 border-l-4 border-r-4 border-b-4 mx-auto border rounded-b-lg p-2 w-11/12 md:w-3/4"
    return (
    <>
        <div className={editorWindow}>
            <h1 className={styles.textContent}>
                <FirstLine/>
                <SecondLine/>
                <ThirdLine/>
                <FourthLine/>
                <LastLine/>
            </h1>
        </div>
    </>
    );
};

const FirstLine = () => {
    return (
        <>
            <span className={styles.let}>let</span>
            <span className={styles.melih}>{" "}Melih{" "}</span>
            <span className={styles.equal}>=</span>
            <span className={styles.bracket}>{" {"}</span>
            <br />
        </>
    );
};
const SecondLine = () => {
    const birthdate = new Date('2001-04-16');
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      calculatedAge--;
    }
    return (
        <>
            <span className={styles.line}>|&nbsp;&nbsp;</span>
            <span className={styles.properties}>age</span>
            <span className={styles.colon}>&nbsp; &nbsp;:</span>
            <span className={styles.integer}>{" "}{calculatedAge}</span>
            <span className={styles.comma}>,</span>
            <br />
        </>
    );
};
const ThirdLine = () => {
    return (
        <>
            <span className={styles.line}>|&nbsp;&nbsp;</span>
            <span className={styles.properties}>studying</span>
            <span className={styles.colon}>&nbsp;:</span>
            <span className={styles.string}>{" `"}Master&apos;s in Computer Science @UHasselt{"`"}</span>
            <span className={styles.comma}>,</span>
            <br />
        </>
    );
};
const FourthLine = () => {
    return (
        <>
            <span className={styles.line}>|&nbsp;&nbsp;</span>
            <span className={styles.properties}>about_me</span>
            <span className={styles.colon}>&nbsp;:</span>
            <span className={styles.string}>
                <br />
                <span className={styles.line}>|&nbsp;&nbsp;</span>
                &nbsp;{" `"}Passionate software engineer{"`"}
                <span className={styles.equal}>&nbsp;+&nbsp;</span>
                <br />
                <span className={styles.line}>|&nbsp;&nbsp;</span>
                &nbsp;{" `"}Thrives on problem-solving challenges{"`"}
            </span>
            <br />
        </>
    );
};
const LastLine = () => {
    return (
        <>
            <span className={styles.bracket}>{"}"}</span>
            <span className={styles.semi_colon}>;</span>
        </>
    );
};