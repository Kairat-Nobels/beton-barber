import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdDeleteOutline } from 'react-icons/md';

const RecordsTable = ({ data, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word" locale={{
      emptyMessage: 'Записей нет',
    }}>
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Имя</Table.HeaderCell>
        <Table.Cell dataKey="name" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Телефон</Table.HeaderCell>
        <Table.Cell dataKey="phone" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Услуга</Table.HeaderCell>
        <Table.Cell dataKey="service" />
      </Table.Column>

      <Table.Column width={100}>
        <Table.HeaderCell>Дата</Table.HeaderCell>
        <Table.Cell dataKey="date" />
      </Table.Column>

      <Table.Column width={80}>
        <Table.HeaderCell>Время</Table.HeaderCell>
        <Table.Cell dataKey="time" />
      </Table.Column>

      <Table.Column width={100} align="center">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell className="deleteBtnTable">
          {(rowData) => (
            <Whisper
              trigger="hover"
              placement="top"
              speaker={<Tooltip>Удалить</Tooltip>}
            >
              <Button onClick={() => onDelete(rowData)} appearance="subtle">
                <MdDeleteOutline color="rgb(210 54 54)" size={20} />
              </Button>
            </Whisper>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default RecordsTable;
