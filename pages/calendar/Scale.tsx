import { Tag } from "antd";
import React from "react";

interface ScaleProps {
  data: any; // verificar tipo a utilizar aqui
}

export default function Scale({ data }: ScaleProps) {
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
