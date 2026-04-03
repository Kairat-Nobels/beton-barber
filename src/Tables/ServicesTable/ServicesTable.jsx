import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline, MdAdd } from 'react-icons/md';

const ServicesTable = ({ data, onEdit, onAdd, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={60} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.Cell dataKey="name" />
      </Table.Column>

      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Категории</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <div>
              {rowData.categories?.map((cat, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p><span>{cat.name}</span> — {cat.price} сом</p>
                  <div className='actionButtons'>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                      <Button appearance="subtle" onClick={() => onEdit(rowData, 'categories', index)}><MdEdit color="#1caf68" size={16} /></Button>
                    </Whisper>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                      <Button appearance="subtle" onClick={() => onDelete(rowData, 'categories', index)}><MdDeleteOutline color="rgb(210 54 54)" size={16} /></Button>
                    </Whisper>
                  </div>
                </div>
              ))}
              <Button size="sm" onClick={() => onAdd(rowData, 'categories')} appearance="primary" style={{ marginTop: 4 }}>
                <MdAdd /> Добавить категорию
              </Button>
            </div>
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Мастера</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <div>
              {rowData.doctors?.map((doc, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{doc.name} — {doc.post}</span>
                  <div className='actionButtons'>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                      <Button appearance="subtle" onClick={() => onEdit(rowData, 'doctors', index)}><MdEdit color="#1caf68" size={16} /></Button>
                    </Whisper>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                      <Button appearance="subtle" onClick={() => onDelete(rowData, 'doctors', index)}><MdDeleteOutline color="rgb(210 54 54)" size={16} /></Button>
                    </Whisper>
                  </div>
                </div>
              ))}
              <Button size="sm" onClick={() => onAdd(rowData, 'doctors')} appearance="primary" style={{ marginTop: 4 }}>
                <MdAdd /> Добавить мастера
              </Button>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default ServicesTable;
