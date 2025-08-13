import GroupsIcon from "@mui/icons-material/Groups";
import GradingIcon from "@mui/icons-material/Grading";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
export function calculateOrderInPage(
  page: string | number | null,
  index: number,
  pageSize: number
) {
  return (Number(page || 1) - 1) * pageSize + index + 1;
}
export function calculateArithmeticMean(numbers: number[]): number | null {
  if (numbers.length === 0) return null; // Handle empty array case

  const sum = numbers.reduce((acc, num) => acc + num, 0); // Sum all the numbers
  return +(sum / numbers.length).toFixed(2); // Divide the sum by the number of elements
}

export function formatDate(inputDate: string) {
  // Create a new Date object from the input string
  const date = new Date(inputDate);

  // Extract day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
  const year = date.getFullYear();

  // Return formatted date as 'dd-mm-yyyy'
  return inputDate ? `${day}-${month}-${year}` : "";
}

export function truncateText(str: string, maxlength: number) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}
export const filterSelectorValues = (
  list: { label: string; value: number }[],
  object: string | any[] | any | null
): any[] => {
  if (object) {
    // Function to normalize object (either string or array)
    const parseObject = (obj: string | any) =>
      typeof obj === "string" ? JSON.parse(obj) : obj;

    // Convert object to array if it's not already
    const objectArray = Array.isArray(object)
      ? object.map(parseObject)
      : [parseObject(object)];

    console.log(objectArray);
    // Check if any of the objects are present in the list
    const availableInList = list?.length
      ? list.some((item) =>
          objectArray.some((obj) => obj?.value === item?.value)
        )
      : true;

    // If available in list, return the list, otherwise append object(s)
    return availableInList
      ? list
      : objectArray.filter((obj) => obj !== null).length
      ? [...objectArray, ...list]
      : list;
  } else {
    return list;
  }
};

export async function urlToFile(url: string) {
  try {
    // Fetch the URL
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch the URL");
    }

    // Extract filename from the URL
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1] || "file";

    // Get MIME type from response headers
    const mimeType =
      response.headers.get("content-type") || "application/octet-stream";

    // Convert the response to a Blob
    const blob = await response.blob();

    // Convert the Blob to a File
    const file = new File([blob], filename, { type: mimeType });

    return file;
  } catch (error) {
    console.error("Error converting URL to File:", error);
  }
}

export const rolesList = [
  { name: "Admin", value: "admin" },
  { name: "Dekan", value: "dean" },
  { name: "Meneger", value: "manager" },
  { name: "Super admin", value: "superadmin" },
  { name: "O'qituvchi", value: "professor" },
];

export const journalTypes = [
  { label: "Amaliy jurnal", value: "practical" },
  { label: "Mustaqil ta'lim", value: "independent_study" },
  { label: "Leksiya", value: "lecture" },
];
export const scoreTypes = [
  { label: "Ballik baholash", value: "score" },
  { label: "Standard baholash", value: "percent" },
];

export const journalStatuses = [
  { label: "To'liq baholash", value: "constant" },
  { label: "Yarim baholash", value: "half" },
];
export const pageList = [
  {
    title: "Talabalar",
    icon: GroupsIcon,
    path: "students",
    permissions: ["superadmin"],
  },
  {
    title: "O'qituvchilar",
    icon: GroupsIcon,
    path: "professors",
    permissions: ["superadmin"],
  },
  {
    title: "Guruhlar",
    icon: GroupsIcon,
    path: "groups",
    permissions: [
      "superadmin",
      // "admin", "manager",
      "dean",
    ],
  },
  {
    title: "Jurnallar",
    icon: GradingIcon,
    path: "journal-list",
    permissions: ["admin", "superadmin", "dean", "professor", "manager"],
  },
  {
    title: "Profil",
    icon: AccountBoxIcon,
    path: "profile",
    permissions: ["admin", "superadmin", "dean", "professor", "manager"],
  },
  {
    title: "Tizim xodimlari",
    icon: GroupsIcon,
    path: "users",
    permissions: ["superadmin"],
  },
  {
    title: "Fan mavzulari",
    icon: GroupsIcon,
    path: "subject-topics",
    permissions: ["superadmin", "manager"],
  },
];
