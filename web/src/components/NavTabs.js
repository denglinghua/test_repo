import * as React from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BarChartIcon from "@mui/icons-material/BarChart";

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(tabs[newValue].router);
  };

  const tabs = [
    { label: "Evaluation", icon: <FactCheckIcon />, router: "/evaluate" },
    { label: "Statistics", icon: <BarChartIcon />, router: "/stats" },
  ];

  return (
    <Tabs value={value} onChange={handleChange} aria-label="Nav" textColor="inherit">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          icon={tab.icon}
          label={tab.label}
          sx={{
            color: value === index ? "" : "#E0E0E0",
            fontWeight: value === index ? "bold" : "normal",
          }}
        />
      ))}
    </Tabs>
  );
}
