import * as React from "react";
import { Stack, Box, Typography } from "@mui/material";
import ReactECharts from "echarts-for-react";
import * as g from "../utils/global";

export default function Stats() {
  const [data, setData] = React.useState({ accuracy: [], quality: [] });

  React.useEffect(() => {
    g.setLoading(true);
    g.get("/stats")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .finally(() => {
        g.setLoading(false);
      });
  }, []);

  const getOption = (title, data) => {
    const series = data.map((item) => {
      return { name: item[0], value: item[1] };
    });
    let option = {
      title: {
        text: title,
        left: "center",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      color: ["red", "blue", "green", "orange", "purple"],
      series: [
        {
          type: "pie",
          radius: "50%",
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            color: "inherit",
            fontSize: 14,
            fontStyle: "bold",
            formatter: "{b}: {d}%",
          },
          data: series,
        },
      ],
    };

    return option;
  };

  const chartStyle = { width: "400px", height: "360px" };

  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <h2>Score Distribution</h2>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={6}>
        <ReactECharts
          option={getOption("Clinical Accuracy", data.accuracy)}
          notMerge={true}
          lazyUpdate={true}
          style={chartStyle}
        />
        <ReactECharts
          option={getOption("Overall Quality", data.quality)}
          notMerge={true}
          lazyUpdate={true}
          style={chartStyle}
        />
      </Stack>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="caption">The data is based on the evaluation of all uploaded files.</Typography>
      </Box>
    </Stack>
  );
}
