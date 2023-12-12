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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  console.log(rows);

  const [hb10Info, setHb10Info] = useState(rows);
  const urlHb10Stock = `http://3.35.228.162:3000/hb10stock`;
  const [startDate, setStartDate] = useState(new Date());

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
      const resHb10stock = await axios.get(urlHb10Stock, { params });
      console.log(resHb10stock.data);

      const rowHb10stock = resHb10stock.data.filter((stock) => stock.buy_hb10_1_count > 0);

      console.log(rowHb10stock);

      setHb10Info(rowHb10stock);
    }
    getchStcokInfo();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  HB10 거래 내역
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>종목</TableCell>
                        <TableCell>매수1</TableCell>
                        <TableCell>매수2</TableCell>
                        <TableCell>매수3</TableCell>
                        <TableCell>매도</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hb10Info.map((stock) => (
                        <TableRow key={stock.stock_code}>
                          <TableCell>{stock.stock_name}</TableCell>
                          <TableCell>
                            {stock.buy_hb10_1_count > 0
                              ? `${stock.buy_hb10_1_price}\n(${stock.buy_hb10_1_count})`
                              : `-`}
                          </TableCell>
                          <TableCell>
                            {stock.buy_hb10_2_count > 0
                              ? `${stock.buy_hb10_2_price}\n(${stock.buy_hb10_2_count})`
                              : `-`}
                          </TableCell>
                          <TableCell>
                            {stock.buy_hb10_3_count > 0
                              ? `${stock.buy_hb10_3_price}\n(${stock.buy_hb10_3_count})`
                              : `-`}
                          </TableCell>
                          <TableCell>
                            {stock.sell_count > 0
                              ? `${stock.sell_price}\n(${stock.sell_count})`
                              : `-`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* <DataTable
                  table={{ columns, hb10Info }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
