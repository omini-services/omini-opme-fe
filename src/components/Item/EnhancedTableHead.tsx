import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from '@mui/utils';


import Checkbox from "@mui/joy/Checkbox";
import { Order } from "@/types/Item";

interface Data {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];


const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;

    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <thead>
            <tr>
                <th padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </th>
               {/* {headCells.map((headCell) => (
                   <TableCell
                       key={headCell.id}
                       align={headCell.numeric ? 'right' : 'left'}
                       padding={headCell.disablePadding ? 'none' : 'normal'}
                       sortDirection={orderBy === headCell.id ? order : false}
                   >
                       <TableSortLabel
                           active={orderBy === headCell.id}
                           direction={orderBy === headCell.id ? order : 'asc'}
                           onClick={createSortHandler(headCell.id)}
                       >
                           {headCell.label}
                           {orderBy === headCell.id ? (
                               <Box component="span" sx={visuallyHidden}>
                                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                               </Box>
                           ) : null}
                       </TableSortLabel>
                   </TableCell>
               ))} */}
        </tr >
        </thead >
    );
}

export default EnhancedTableHead;