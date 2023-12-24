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
  const [hb13Info, setHb13Info] = useState(rows);
  const urlHb10Stock = `http://3.35.228.162:3000/hb10stock`;
  const urlHb13Stock = `http://3.35.228.162:3000/hb13stock`;
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

    const resHb10stock = await axios.get(urlHb10Stock, { params });
    setHb10Info(resHb10stock.data.filter((stock) => stock.buy_hb10_1_count > 0));

    const resHb13stock = await axios.get(urlHb13Stock, { params });
    console.log(resHb13stock.data);
    setHb13Info(resHb13stock.data.filter((stock) => stock.buy_hb13_1_count > 0));
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
      const resHb10stock = await axios.get(urlHb10Stock, { params });
      const rowHb10stock = resHb10stock.data.filter((stock) => stock.buy_hb10_1_count > 0);

      const resHb13stock = await axios.get(urlHb13Stock, { params });
      const rowHb13stock = resHb13stock.data.filter((stock) => stock.buy_hb13_1_count > 0);

      setHb10Info(rowHb10stock);
      setHb13Info(rowHb13stock);
    }
    getchStcokInfo();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DatePicker selected={startDate} onChange={handleDateChange} />
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
              <MDBox pt={3} style={{ overflowX: "auto" }}>
                <TableContainer style={{ fontSize: "5px", minWidth: "600px" }}>
                  <Table style={{ width: "100%" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>종목</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매수1</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매수2</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매수3</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매도</strong>
                        </TableCell>
                        <TableCell>
                          <strong>손익</strong>
                        </TableCell>
                      </TableRow>
                      {hb10Info.map((stock) => (
                        <TableRow key={stock.stock_code}>
                          <TableCell component="th" scope="row">
                            {stock.stock_name}
                          </TableCell>
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
                            {stock.sell_count > 0 ? (
                              Number(stock.buy_hb10_1_price) * Number(stock.buy_hb10_1_count) +
                                Number(stock.buy_hb10_2_price) * Number(stock.buy_hb10_2_count) +
                                Number(stock.buy_hb10_3_price) * Number(stock.buy_hb10_3_count) <
                              Number(stock.sell_price) * Number(stock.sell_count) ? (
                                <strong style={{ color: "red" }}>
                                  {`${stock.sell_price}\n(${stock.sell_count})`}
                                </strong>
                              ) : (
                                <strong style={{ color: "blue" }}>
                                  {`${stock.sell_price}\n(${stock.sell_count})`}
                                </strong>
                              )
                            ) : (
                              `-`
                            )}
                          </TableCell>
                          <TableCell>
                            {stock.sell_count > 0
                              ? Number(stock.sell_price) * Number(stock.sell_count) -
                                (Number(stock.buy_hb10_1_price) * Number(stock.buy_hb10_1_count) +
                                  Number(stock.buy_hb10_2_price) * Number(stock.buy_hb10_2_count) +
                                  Number(stock.buy_hb10_3_price) * Number(stock.buy_hb10_3_count))
                              : `-`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                  HB13 거래내역
                </MDTypography>
              </MDBox>
              <MDBox pt={3} style={{ overflowX: "auto" }}>
                <TableContainer style={{ fontSize: "5px", minWidth: "600px" }}>
                  <Table style={{ width: "100%" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>종목</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매수1</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매수2</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매수3</strong>
                        </TableCell>
                        <TableCell>
                          <strong>매도</strong>
                        </TableCell>
                        <TableCell>
                          <strong>손익</strong>
                        </TableCell>
                      </TableRow>
                      {hb13Info.map((stock) => (
                        <TableRow key={stock.stock_code}>
                          <TableCell component="th" scope="row">
                            {stock.stock_name}
                          </TableCell>
                          <TableCell>
                            {stock.buy_hb13_1_count > 0
                              ? `${stock.buy_hb13_1_price}\n(${stock.buy_hb13_1_count})`
                              : `-`}
                          </TableCell>
                          <TableCell>
                            {stock.buy_hb13_2_count > 0
                              ? `${stock.buy_hb13_2_price}\n(${stock.buy_hb13_2_count})`
                              : `-`}
                          </TableCell>
                          <TableCell>
                            {stock.buy_hb13_3_count > 0
                              ? `${stock.buy_hb13_3_price}\n(${stock.buy_hb13_3_count})`
                              : `-`}
                          </TableCell>
                          <TableCell>
                            {stock.sell_hb13_count > 0 ? (
                              Number(stock.buy_hb13_1_price) * Number(stock.buy_hb13_1_count) +
                                Number(stock.buy_hb13_2_price) * Number(stock.buy_hb13_2_count) +
                                Number(stock.buy_hb13_3_price) * Number(stock.buy_hb13_3_count) <
                              Number(stock.sell_hb13_price) * Number(stock.sell_hb13_count) ? (
                                <strong style={{ color: "red" }}>
                                  {`${stock.sell_hb13_price}\n(${stock.sell_hb13_count})`}
                                </strong>
                              ) : (
                                <strong style={{ color: "blue" }}>
                                  {`${stock.sell_hb13_price}\n(${stock.sell_hb13_count})`}
                                </strong>
                              )
                            ) : (
                              `-`
                            )}
                          </TableCell>
                          <TableCell>
                            {stock.sell_hb13_count > 0
                              ? Number(stock.sell_hb13_price) * Number(stock.sell_hb13_count) -
                                (Number(stock.buy_hb13_1_price) * Number(stock.buy_hb13_1_count) +
                                  Number(stock.buy_hb13_2_price) * Number(stock.buy_hb13_2_count) +
                                  Number(stock.buy_hb13_3_price) * Number(stock.buy_hb13_3_count))
                              : `-`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
