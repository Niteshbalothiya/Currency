import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../Config/Api";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);

  const timeRanges = [
    { label: "24 Hours", value: 1 },
    { label: "30 Days", value: 30 },
    { label: "3 Months", value: 90 },
    { label: "6 Months", value: 180 },
    { label: "1 Year", value: 365 },
  ];

  const fetchHistoricData = async () => {
    if (!coin?.id) {
      console.error("Coin ID is missing!");
      return;
    }

    try {
      const url = HistoricalChart(coin.id, days); // No currency parameter
   //   console.log("Fetching data from:", url);
      const { data } = await axios.get(url);

      if (data?.prices) {
        setHistoricData(data.prices);
      } else {
        console.error("Invalid data format from API:", data);
        setHistoricData([]);
      }
    } catch (error) {
     // console.error("Error fetching historical data:", error);
      alert("Failed to fetch historical data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days, coin]);

  // Process Data for Chart
  const processedData = historicData.map((entry) => ({
    time: new Date(entry[0]).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    value: entry[1],
  }));

  const darkTheme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ width: "75%", margin: "auto", padding: "40px", textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{
            color: "white",
            marginBottom: "20px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          {coin?.name} Price Chart (Last {days} Days)
        </Typography>

        {historicData.length === 0 ? (
          <CircularProgress style={{ color: "gold" }} size={100} thickness={1} />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis dataKey="time" tick={{ fill: "white" }} minTickGap={20} />
              <YAxis tick={{ fill: "white" }} tickCount={7} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ backgroundColor: "transparent", border: "none" }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FFD700"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: "white" }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {/* Time Range Buttons */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", gap: "15px" }}>
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              onClick={() => setDays(range.value)}
              variant={days === range.value ? "contained" : "outlined"}
              sx={{
                backgroundColor: days === range.value ? "#FFD700" : "transparent",
                color: days === range.value ? "black" : "#fff",
                border: "2px solid white",
                fontWeight: "bold",
                textTransform: "none",
                padding: "12px 24px",
                fontSize: "16px",
                letterSpacing: "0.5px",
                borderRadius: "12px",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#FFC107",
                  color: "black",
                },
              }}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
