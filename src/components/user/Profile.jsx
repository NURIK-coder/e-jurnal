import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../../store/store";
import { currentUser } from "../../store/currUser";
const URL = import.meta.env.VITE_API_URL;
export default function Profile() {
  const user = useSelector((state) => state.userInfo.user);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    store.dispatch(currentUser());
  }, []);

  useEffect(() => {
    if (user?.active_role) {
      setSelectedRole(user.active_role);
    }
  }, [user]);

  async function handleRoleChange(e) {
    const newRole = e.target.value;
    setSelectedRole(newRole);

    try {
      const response = await fetch(URL +"account/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("journal_token"),
        },
        body: JSON.stringify({ active_role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при изменении роли");
      }

      // Обновляем профиль
      store.dispatch(currentUser());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Профиль</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <span className="font-semibold">Имя: </span>
          {user.first_name || <span className="text-gray-500">Не указано</span>}
        </div>

        <div>
          <span className="font-semibold">Фамилия: </span>
          {user.last_name || <span className="text-gray-500">Не указано</span>}
        </div>

        <div>
          <span className="font-semibold">Логин: </span>
          {user.username}
        </div>

        <div>
          <span className="font-semibold">Телефон: </span>
          {user.phone_number || <span className="text-gray-500">Не указано</span>}
        </div>

        {/* Выбор активной роли */}
        <div>
          <span className="font-semibold">Активная роль: </span>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="ml-2 border rounded p-1"
          >
            {user.roles?.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
