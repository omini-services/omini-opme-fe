import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { DIALOG_INITIAL_STATE, dialogState } from '@/atoms/dialog';
import {
  tableSelectedItemsState,
  formOpenAtom,
  filterState,
} from '@/atoms/item';
import Filter from '@/components/Table/Filter';
import TableSkeleton from '@/components/Table/Skeleton';
import TableHeader from '@/components/Table/TableHeader';
import Table from '@components/Table';

interface IBaseCRUDTable {
  loading: boolean;
  rows: Array<any>;
  updateData: Object;
  initialState: Object;
  headCells: Array<any>;
  tableCells: Array<any>;
  onUpdateData: Function;
  sortingInterface: string;
  onOpenUpdateForm: Function;
  onCreateDialogOptions: Function;
  onCallbackAfterSubmit: Function;
  formComponent: React.ComponentType<any>;
}

const BaseCRUDTable = (props: IBaseCRUDTable) => {
  const {
    rows,
    loading,
    headCells,
    updateData,
    tableCells,
    initialState,
    onUpdateData,
    sortingInterface,
    onOpenUpdateForm,
    formComponent: Form,
    onCreateDialogOptions,
    onCallbackAfterSubmit,
  } = props;

  const setDialog = useSetRecoilState(dialogState);
  const setSelectedItems = useSetRecoilState<any>(tableSelectedItemsState);

  const [formOpen, setFormOpen] = useRecoilState(formOpenAtom);

  const handleOpen = () => setFormOpen(true);
  const handleClose = () => {
    setFormOpen(false);
    onUpdateData(initialState);
  };

  useEffect(
    () => () => {
      setFormOpen(false);
      setDialog(DIALOG_INITIAL_STATE);
      setSelectedItems([]);
    },
    [setFormOpen, setDialog, setSelectedItems],
  );

  const handleOnDelete = (id: string) => setDialog(onCreateDialogOptions(id));

  return (
    <>
      <Box
        className="page-toolbar-wrapper"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          paddingTop: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            cursor: 'pointer',
          }}
        >
          Novo Item
        </Button>
        <Filter loading={loading} atom={filterState} />
      </Box>
      <Table
        rows={rows}
        loading={loading}
        tableAtom={tableSelectedItemsState}
        onUpdate={(id) => onOpenUpdateForm(id)}
        onDelete={(id) => handleOnDelete(id)}
        skeleton={TableSkeleton}
        title="Items"
        tableHeader={TableHeader}
        tableHeaderProps={{ headCells, sortingInterface }}
        tableCells={tableCells}
        filterAtom={filterState}
        tableSkeletonProps={{ rows: 13, columns: 9 }}
      />

      <Form
        open={formOpen}
        handleClose={handleClose}
        initialData={updateData}
        callbackAfterSubmit={onCallbackAfterSubmit}
      />
    </>
  );
};

export default BaseCRUDTable;
