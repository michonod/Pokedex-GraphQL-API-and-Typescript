import React from "react";
import { Spin } from "antd";
import styles from "../styles/Home.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingState}>
      <Spin size="large" tip="Loading..."></Spin>
    </div>
  );
};

export default Loading;
