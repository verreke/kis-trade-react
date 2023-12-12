/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [stockInfo, setStockInfo] = useState([]);
  const urlUpperPriceStock = `http://3.35.228.162:3000/upperpricestock`;
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = async (date) => {
    setStartDate(date);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = date
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .replace(/ /g, "/");
    console.log("handleDateChange");
    console.log(formattedDate);

    const params = {
      date: formattedDate, // YYYY/MM/DD 포맷
    };

    const resUpperpricestock = await axios.get(urlUpperPriceStock, { params });
    console.log(resUpperpricestock.data);
    setStockInfo(resUpperpricestock.data);
  };

  useEffect(() => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = startDate
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .replace(/ /g, "/");
    console.log(formattedDate);

    const params = {
      date: formattedDate, // YYYY/MM/DD 포맷
    };

    async function getchStcokInfo() {
      const resUpperpricestock = await axios.get(urlUpperPriceStock, { params });
      console.log(resUpperpricestock.data);
      setStockInfo(resUpperpricestock.data);
    }
    getchStcokInfo();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DatePicker selected={startDate} onChange={handleDateChange} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid> */}
          {stockInfo.map((stock) => (
            <Grid item xs={12} md={6} lg={3} key={stock.stock_code}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Today's Users"
                  count={stock.stock_name}
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                  condition={{
                    newhigh: stock.new_high,
                    before13: stock.reach_before,
                    volume: stock.over_trading_value,
                    break: stock.break_count,
                  }}
                />
              </MDBox>
            </Grid>
          ))}
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
