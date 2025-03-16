import * as React from "react";
import Box from "@mui/material/Box";
import ReactECharts from "echarts-for-react";
import * as g from "../utils/global";

export default function Chart() {
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
      series: [
        {
          type: "pie",
          radius: '50%',
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            color: "inherit",
            fontSize: 14,
            fontStyle: "bold",
            formatter: '{b}: {d}%',
          },
          data: series,
        },
      ],
    };

    return option;
  };

  return (
    <Box sx={{ width: "480px", height: "600px" }}>
      <ReactECharts option={getOption('Clinical Accuracy', data.accuracy)} notMerge={true} lazyUpdate={true} />
      <ReactECharts option={getOption('Overall Quality', data.quality)} notMerge={true} lazyUpdate={true} />
    </Box>
  );
}
