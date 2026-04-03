import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../../redux/slices/reviewsSlice';
import { RotatingLines } from 'react-loader-spinner';
import ReviewsTable from '../../Tables/ReviewsTable/ReviewsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import 'rsuite/dist/rsuite.min.css';

const ReviewsAdmin = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviewsReducer);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className="adminReviews">
      <div className="adminRecordHeader">
        <div className="adminPageHead">
          <span className="adminPageLabel">BETON ADMIN</span>
          <h3>Отзывы</h3>
          <p className="adminPageText">
            Просмотр и удаление отзывов клиентов барбершопа.
          </p>
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
        <ReviewsTable
          data={reviews}
          onDelete={(review) => setDeleteTarget(review)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteReview}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}
    </div>
  );
};

export default ReviewsAdmin;
