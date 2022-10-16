import { Calendar } from "antd";
import { Moment } from "moment";
import { GetStaticProps } from "next";
import { fakeScales, TScale } from "../../services/fakeData";
import Scale from "./Scale";
import styles from "./styles.module.css";
import React from "react";

const getListData = (value: Moment, scales: Array<TScale>) => {
  const colors = ["#7cb305", "#13c2c2", "#1890ff", "#2f54eb"];

  let colorCounter = 0;
  let listData = new Array();

  scales.forEach(async (scale) => {
    const date = new Date(scale.date);
    if (
      date.getDate() == value.date() &&
      date.getMonth() == value.month() &&
      date.getFullYear() == value.year()
    ) {
      if (!scale.idDoctor) {
        listData.push({
          id: scale.id,
          doctorName: "Vago",
          color: "warning",
        });
      } else {
        listData.push({
          id: scale.id,
          doctorName: scale.nameDoctor,
          color: colors[colorCounter++],
        });
      }
    }
  });

  return listData || [];
};

interface CalendarProps {
  scales: Array<TScale>;
}

export default function calendar({ scales }: CalendarProps) {
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

  return <Calendar dateCellRender={dateCellRender} />;
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
