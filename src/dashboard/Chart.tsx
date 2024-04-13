import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Title from "../components/Title";
import { useQuery } from "@tanstack/react-query";
import { CryptoData, getDogecoinHistory } from "../service/cryptoServices";

export default function Chart() {
  const { data: dogecoin } = useQuery({
    queryKey: ["dogecoin"],
    queryFn: getDogecoinHistory,
    gcTime: 0
  });

   const formattedData = dogecoin?.map((item: CryptoData) => ({
    date: new Date(item.date).toLocaleDateString("en-US"),
    price: parseFloat(item.priceUsd),
  }));
  
  return (
    <React.Fragment>
      <Title>Dogecoin</Title>
      <div
        style={{
          width: "100%",
          height: "300px",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <ResponsiveContainer>
           <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1976d2"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>   
      </div>
    </React.Fragment>
  );
}
