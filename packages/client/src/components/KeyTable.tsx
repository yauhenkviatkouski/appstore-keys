import { KeyRow } from "./KeyRow";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type KeyTableProps = {
  keys: string[];
  country: string;
  onDeleteItem: (key: string) => void;
};

function KeyTable(props: KeyTableProps) {
  const columns = [
    { dataIndex: "number", title: "№", width: 70 },
    { dataIndex: "id", title: "KeyWord", width: 280 },
    {
      dataIndex: "keyWord",
      title: "Positions",
      width: 665,
      render: (keyWord: string) => (
        <KeyRow keyWord={keyWord as string} country={props.country} />
      ),
    },
    {
      dataIndex: "delete",
      title: "",
      width: 70,
      render: (_: any, { keyWord }) => (
        <Button
          onClick={() => props.onDeleteItem(keyWord)}
          style={{ margin: 0 }}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];

  const rows = props.keys.map((keyWord, i) => ({
    key: i,
    number: i + 1,
    id: keyWord.replace(/[\s{2,}]+/g, " "),
    keyWord,
  }));

  return <Table pagination={false} dataSource={rows} columns={columns} />;
}

export { KeyTable };
