import { Calendar } from "antd";
import { Moment } from "moment";
import { GetStaticProps } from "next";
import { fakeSchedules, TSchedule } from "../../services/fakeData";
import Schedule from "../../components/Schedule";
import styles from "./styles.module.css";
import React from "react";

const getListData = (value: Moment, schedules: Array<TSchedule>) => {
  const colors = ["#7cb305", "#13c2c2", "#1890ff", "#2f54eb"];

  let colorCounter = 0;
  let listData = new Array();

  schedules.forEach(async (schedule) => {
    const date = new Date(schedule.date);
    if (
      date.getDate() == value.date() &&
      date.getMonth() == value.month() &&
      date.getFullYear() == value.year()
    ) {
      if (!schedule.idDoctor) {
        listData.push({
          id: schedule.id,
          doctorName: "Vago",
          color: "warning",
        });
      } else {
        listData.push({
          id: schedule.id,
          doctorName: schedule.nameDoctor,
          color: colors[colorCounter++],
        });
      }
    }
  });

  return listData || [];
};

interface CalendarProps {
  schedules: Array<TSchedule>;
}

export default function calendar({ schedules }: CalendarProps) {
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, schedules);
    return (
      <ul className={styles.events}>
        {listData?.map((schedule) => (
          <li key={schedule.id}>
            <Schedule data={schedule} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const schedules = fakeSchedules;

  return {
    props: {
      schedules,
    },
    revalidate: 10,
  };
};
