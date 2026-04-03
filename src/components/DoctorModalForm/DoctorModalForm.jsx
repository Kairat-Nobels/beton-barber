import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  Uploader,
  Input,
} from "rsuite";
import { useDispatch } from "react-redux";
import { createDoctor, updateDoctor } from "../../redux/slices/doctorsSlice";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите имя"),
  post: StringType().isRequired("Укажите должность"),
  age: NumberType("Возраст должен быть числом").isRequired("Укажите возраст"),
  education: StringType().isRequired("Укажите образование"),
  deal: StringType().isRequired("Укажите описание деятельности"),
  experience: StringType().isRequired("Укажите опыт"),
});

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const DoctorModalForm = ({ open, onClose, doctorData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [formValue, setFormValue] = useState({
    name: "",
    post: "",
    age: "",
    education: "",
    experience: "",
    deal: "",
  });

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (doctorData) {
      setFormValue({
        name: doctorData.name || "",
        post: doctorData.post || "",
        age: doctorData.age || "",
        education: doctorData.education || "",
        experience: doctorData.experience || "",
        deal: doctorData.deal || "",
      });
      setImgUrl(doctorData.img || "");
    } else {
      setFormValue({
        name: "",
        post: "",
        age: "",
        education: "",
        experience: "",
        deal: "",
      });
      setImgUrl("");
    }
  }, [doctorData]);

  const handleSubmit = () => {
    if (!formRef.current) return;
    if (!formRef.current.check()) return;

    const payload = {
      ...formValue,
      age: Number(formValue.age),
      img: imgUrl,
    };

    if (doctorData) {
      dispatch(updateDoctor({ id: doctorData.id, updatedData: payload }));
    } else {
      dispatch(createDoctor(payload));
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="doctor-modal"
      overflow={false}
    >
      <Modal.Header>
        <Modal.Title>
          {doctorData ? "Редактировать мастера" : "Добавить мастера"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="doctor-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="doctor"
            />
          )}

          <Uploader
            action="https://dd29dd1916b01872.mokky.dev/uploads"
            name="file"
            autoUpload
            fileListVisible={false}
            onSuccess={(res) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Загрузить фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
            value={imgUrl}
            onChange={setImgUrl}
          />
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          className="doctor-modal__form"
        >
          <Form.Group>
            <Form.ControlLabel>Имя мастера</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Должность</Form.ControlLabel>
            <Form.Control name="post" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Возраст</Form.ControlLabel>
            <Form.Control name="age" type="number" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Образование</Form.ControlLabel>
            <Form.Control name="education" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Опыт</Form.ControlLabel>
            <Form.Control name="experience" />
          </Form.Group>

          <Form.Group className="doctor-modal__textarea">
            <Form.ControlLabel>Описание деятельности</Form.ControlLabel>
            <Form.Control name="deal" accepter={Textarea} rows={4} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>
          {doctorData ? "Сохранить изменения" : "Добавить мастера"}
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorModalForm;
