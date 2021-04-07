import { KeyRow } from "./KeyRow";
import { Table } from "antd";

type KeyTableProps = {
  keys: string[];
  country: string;
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
