import React from "react";
import { Tooltip, Button } from "antd";
import { QuestionOutlined, DownloadOutlined } from "@ant-design/icons";
import { PieChannel } from "../components/HomePie/PieChannel";
import { CSVDownloader } from "react-papaparse";

export function PieStatistic(props) {
  const { dataList, title } = props;
  
  const [dataCSV, setDataCSV] = React.useState(() => {
    const initData = []
    var object = new Object();
    dataList.forEach((item, index) => {
      object[item.type] = item.value;
    });
    initData.push(object);
    return initData;
  });


  return (
    <div>
      <div className="flex justify-between mt-2">
        <div>
          <h2 className="text-xl font-medium inline">{title}</h2>
          <Tooltip title={title}>
            <Button
              className="ml-2"
              size="small"
              shape="circle"
              icon={<QuestionOutlined />}
            />
          </Tooltip>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          borderRadius: "0.5rem",
          marginTop: "0.5rem",
          backgroundColor: "#FFFFFF",
        }}
      >
        <PieChannel data={dataList} />
        <div className="flex justify-center">
          <CSVDownloader
            data={dataCSV}
            type="button"
            filename={"Thong_ke"}
            bom={true}  
          >
            <Button
              className="my-5"
              size="large"
              icon={<DownloadOutlined style={{ fontSize: "15px" }} />}
            >
              Tải báo cáo xuống
            </Button>
          </CSVDownloader>
        </div>
      </div>
    </div>
  );
}
