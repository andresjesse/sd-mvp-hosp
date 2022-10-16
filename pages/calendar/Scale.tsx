import React from "react";
import { Badge, Tag, Button } from "antd";

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
        {data.doctor}
      </Tag>
    </div>
  );
}
