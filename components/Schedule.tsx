import { Tag } from "antd";
import React from "react";

interface ScheduleProps {
  data: any; // verificar tipo a utilizar aqui
}

export default function Schedule({ data }: ScheduleProps) {
  return (
    <div>
      <Tag
        style={{ minWidth: "90%", textAlign: "right", fontWeight: "bold" }}
        color={data.color}
      >
        {data.doctorName}
      </Tag>
    </div>
  );
}
