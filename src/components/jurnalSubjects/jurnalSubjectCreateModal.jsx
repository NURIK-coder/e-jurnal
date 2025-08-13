import { useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

export default function JurnalSubjectCreateModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  error, 
  filter,
  slearError
}) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    speciality: "",
    level: "",
    journal_type: "",
    semester: "",
    education_year: "",
    subject: "",
    pass_topics_number: ""
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
      setFormData({
        speciality: "",
        level: "",
        journal_type: "",
        semester: "",
        education_year: "",
        subject: "",
        pass_topics_number: ""
      });
      onClose();
      clearErr
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t("add_subject")}</h2>

        {error && (
          <div className="bg-red-500 p-3 m-2 text-white rounded-md">
            <p>{error?.errors?.non_field_errors?.[0] || "Xatolik yuz berdi"}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Специальность */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Speciality</label>
            <Select
              showSearch
              placeholder="Tanlang..."
              value={formData.speciality || undefined}
              onChange={(value) => handleChange("speciality", value)}
              className="w-full"
            >
              {filter?.specialities.results?.map((spec) => (
                <Option key={spec.id} value={spec.id}>
                  {spec.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Уровень */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Level</label>
            <Select
              placeholder="Tanlang..."
              value={formData.level || undefined}
              onChange={(value) => handleChange("level", value)}
              className="w-full"
            >
              {filter?.levels.results?.map((lvl) => (
                <Option key={lvl.id} value={lvl.id}>
                  {lvl.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Предмет */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
            <Select
              showSearch
              placeholder="Tanlang..."
              value={formData.subject || undefined}
              onChange={(value) => handleChange("subject", value)}
              className="w-full"
            >
              {filter?.subjects.results?.map((subj) => (
                <Option key={subj.id} value={subj.id}>
                  {subj.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Тип журнала */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Jurnal turi</label>
            <select name="" id="" className="p-2 border rounded-md w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <option value="practical">Amaliy</option>
                <option value="lecture">Leksiya</option>
                <option value="independed_study">Mestaqil ta'lim</option>
            </select>
          </div>

          {/* Семестр */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Semestr</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              className="p-2 border rounded-md w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="">Tanlang...</option>
              <option value="1">Semestr</option>
            </select>
          </div>

          {/* Учебный год */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">O'quv yili</label>
            <Select
              placeholder="Tanlang..."
              value={formData.subject || undefined}
              onChange={(value) => handleChange("education_year", value)}
              className="w-full"
            >
              {filter?.education_years?.map((ed) => (
                <Option key={ed.id} value={ed.id}>
                  {ed.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Количество тем */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">O'tish bali</label>
            <input
              type="number"
              name="pass_topics_number"
              value={formData.pass_topics_number}
              onChange={(e) => handleChange("pass_topics_number", e.target.value)}
              className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              min="1"
            />
          </div>

          {/* Кнопки */}
          <div className="flex justify-between gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
