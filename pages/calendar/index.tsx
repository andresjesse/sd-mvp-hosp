import { Calendar } from "antd";
import { Moment } from "moment";
import { GetStaticProps } from "next";
import React from "react";
import { fakeScales, TScale } from "../../services/fakeData";
import Scale from "./Scale";

import styles from "./styles.module.css";

const getListData = (value: Moment, scales: Array<TScale>) => {
  const colors = ["#a0d911", "#13c2c2", "#1890ff", "#2f54eb"];
  let colorCounter = 0;
  let listData = new Array<Object>();

  scales.forEach(async (element) => {
    const date = new Date(element.date);

    if (date.getDate() == value.date() && date.getMonth() == value.month()) {
      listData.push({
        id: element.id,
        doctor: element.nameDoctor,
        color: colors[colorCounter++],
      });
    }
  });

  return listData || [];
};

interface CalendarProps {
  scales: Array<TScale>;
}

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export default function calendar({ scales }: CalendarProps) {
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className={styles.notesMonth}>
        {/* <section>{num}</section>
        <span>Backlog number</span> */}
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, scales);
    return (
      <ul className={styles.events}>
        {listData?.map((scale) => (
          <li key={scale.id}>
            <Scale data={scale} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const scales = fakeScales;
  return {
    props: {
      scales,
    },
    revalidate: 10,
  };
};
