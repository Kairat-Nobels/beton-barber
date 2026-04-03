import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecord, getRecords } from '../../redux/slices/recordSlice';
import { RotatingLines } from 'react-loader-spinner';
import RecordsTable from '../../Tables/RecordsTable/RecordsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const months = {
  'января': 0,
  'февраля': 1,
  'марта': 2,
  'апреля': 3,
  'мая': 4,
  'июня': 5,
  'июля': 6,
  'августа': 7,
  'сентября': 8,
  'октября': 9,
  'ноября': 10,
  'декабря': 11
};

const RecordsPage = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.recordsReducer);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter] = useState('actual');

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  const today = new Date();

  const parseDate = (dateStr, timeStr) => {
    const [day, month] = dateStr.split(' ');
    const hour = parseInt(timeStr.slice(0, 2));
    return new Date(today.getFullYear(), months[month], +day, hour);
  };

  const sortedRecords = [...records].sort((a, b) => {
    const dateA = parseDate(a.date, a.time);
    const dateB = parseDate(b.date, b.time);
    return dateA - dateB;
  });

  const actualRecords = sortedRecords.filter((r) => parseDate(r.date, r.time) >= today);
  const visibleRecords = filter === 'actual' ? actualRecords : sortedRecords;

  return (
    <div className="adminRecords">
      <div className="adminRecordHeader">
        <div className="adminPageHead">
          <span className="adminPageLabel">BETON ADMIN</span>
          <h3>Список записей</h3>
          <p className="adminPageText">
            Управление актуальными и всеми записями клиентов барбершопа.
          </p>
        </div>

        <div className="adminFilterActions">
          <Button
            appearance={filter === 'actual' ? 'primary' : 'default'}
            onClick={() => setFilter('actual')}
          >
            Актуальные
          </Button>

          <Button
            appearance={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
          >
            Все
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="#d4af37" width="56" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <div className="fetchError">
          <p>😕 Error: {error}</p>
          <p>Проверьте интернет и обновите страницу</p>
        </div>
      ) : (
        <RecordsTable
          data={visibleRecords}
          onDelete={(record) => setDeleteTarget(record)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteRecord}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}
    </div>
  );
};

export default RecordsPage;
