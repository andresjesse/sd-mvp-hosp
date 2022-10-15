import React from "react";
import { Badge, Tag, Button } from "antd";

interface ScaleProps {
  data: Array<Object>;
}

export default function Scale({ data }: ScaleProps) {
  return (
    <div>
      <Tag style={{ minWidth: "90%", textAlign: "right" }} color={data.color}>
        {data.doctor}
      </Tag>
    </div>
  );
}
