import { KeyRow } from "./KeyRow";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";

type KeyTableProps = {
  keys: string[];
};

function KeyTable(props: KeyTableProps) {
  const columns: GridColDef[] = [
    { field: "number", headerName: "№", width: 70 },
    { field: "id", headerName: "KeyWord", width: 280 },
    {
      field: "keyWord",
      headerName: "Positions",
      width: 665,
      renderCell: (params: GridCellParams) => (
        <KeyRow keyWord={params.value as string} />
      ),
    },
  ];

  const rows = props.keys.map((keyWord, i) => ({
    number: i,
    id: keyWord.replace(/[\s{2,}]+/g, " "),
    keyWord,
  }));

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={50}
      checkboxSelection
    />
  );
}

export { KeyTable };
