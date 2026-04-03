import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';

const DoctorsTable = ({ data, onEdit, onDelete }) => {

  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={60} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column width={100} fixed>
        <Table.HeaderCell>Фото</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <img src={rowData.img} alt="Фото" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '8px' }} />
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ФИО</Table.HeaderCell>
        <Table.Cell dataKey="name" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Должность</Table.HeaderCell>
        <Table.Cell dataKey="post" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Образование</Table.HeaderCell>
        <Table.Cell dataKey="education" />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Опыт</Table.HeaderCell>
        <Table.Cell dataKey="experience" />
      </Table.Column>

      <Table.Column width={120} align="center" fixed="right">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell className='deleteBtnTable'>
          {(rowData) => (
            <div className='actionButtons'>
              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                <Button onClick={() => onEdit(rowData)} appearance="subtle">
                  <MdEdit color="#1caf68" size={20} />
                </Button>
              </Whisper>

              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                <Button onClick={() => onDelete(rowData)} appearance="subtle">
                  <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                </Button>
              </Whisper>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default DoctorsTable;
