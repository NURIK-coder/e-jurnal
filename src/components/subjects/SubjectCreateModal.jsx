import { useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

export default function SubjectCreateModal({ isOpen, onClose, onSubmit, error, departments }) {
    const {t} = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    active: true,
    department: "",
    educationType: 11
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if(success){
       setFormData({
            name: "",
            active: true,
            department: "",
            educationType: 11
        });
        onClose(); 
    }
      
    
  };

  if (!isOpen) return null;
  console.log(error);
  

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">{t('add_subject')}</h2>

        {error && (
          <div className="bg-red-500 p-3 m-2 text-white rounded-md">
            <p>{error?.errors?.non_field_errors?.[0] || "Xatolik yuz berdi"}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Название */}
          <div>
            <label className="block text-sm font-medium mb-1">Fan nomi</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
              placeholder="Masalan: Matematika"
            />
          </div>

          {/* Кафедра */}
          <div>
                <label className="block text-sm font-medium mb-1">Kafedra</label>
                <Select
                    showSearch
                    aria-required
                    placeholder="Tanlang..."
                    optionFilterProp="children"
                    value={formData.department || undefined}
                    onChange={(value) =>
                    setFormData((prev) => ({ ...prev, department: value }))
                    }
                    filterOption={(input, option) =>
                    (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    className="w-full"
                >
                    {departments?.map((dep) => (
                    <Option key={dep.id} value={dep.id}>
                        {dep.name}
                    </Option>
                    ))}
                </Select>
            </div>
            
          <div className="flex flex-col text-left items-center ">
            <label className="block text-sm text-left w-full font-medium mb-1" htmlFor="">O'qish turi</label>
            <select className="p-2 border  rounded-md w-full">
                <option value="11">Baralavr</option>
            </select>
          </div>


          {/* Активность */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Faol</label>
          </div>
          
          {/* Кнопки */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Yaratish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
