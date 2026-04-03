import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Form, Button, Input } from 'rsuite';

const ServiceEditModal = ({ open, onClose, context, onSubmit }) => {
  const { service, type, mode, index } = context || {};

  const isEdit = type === 'edit';
  const isDoctor = mode === 'doctors';

  const initialData = useMemo(() => {
    if (!service || !mode) return { name: '', price: '', post: '' };

    if (isEdit && service?.[mode]?.[index]) {
      return service[mode][index];
    }

    return isDoctor ? { name: '', post: '' } : { name: '', price: '' };
  }, [service, mode, index, isEdit, isDoctor]);

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedList = [...service[mode]];

    if (isEdit) {
      updatedList[index] = formData;
    } else {
      updatedList.push(formData);
    }

    onSubmit(updatedList, service.id, mode);
  };

  const title = isEdit
    ? isDoctor
      ? 'Редактировать мастера'
      : 'Редактировать категорию'
    : isDoctor
      ? 'Добавить мастера'
      : 'Добавить категорию';

  const isDisabled = isDoctor
    ? !formData.name?.trim() || !formData.post?.trim()
    : !formData.name?.trim() || formData.price === '' || formData.price === null;

  return (
    <Modal open={open} onClose={onClose} size={500}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid className="service-form">
          <Form.Group className="serviceModalName">
            <Form.ControlLabel>
              {isDoctor ? 'Имя мастера' : 'Название'}
            </Form.ControlLabel>
            <Input
              value={formData.name}
              onChange={(val) => handleChange(val, 'name')}
            />
          </Form.Group>

          {isDoctor ? (
            <Form.Group className="serviceModalName">
              <Form.ControlLabel>Должность</Form.ControlLabel>
              <Input
                value={formData.post}
                onChange={(val) => handleChange(val, 'post')}
              />
            </Form.Group>
          ) : (
            <Form.Group className="serviceModalPrice">
              <Form.ControlLabel>Цена (сом)</Form.ControlLabel>
              <Input
                type="number"
                value={formData.price}
                onChange={(val) => handleChange(val, 'price')}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={handleSave}
          appearance="primary"
          disabled={isDisabled}
        >
          Сохранить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceEditModal;