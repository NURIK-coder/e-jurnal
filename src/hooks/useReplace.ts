const UseReplace = (name: string, value: string) => {
  let url = new URL(window.location.href);
  if (value) url.searchParams.set(name, value);
  else url.searchParams.delete(name);

  return url.search;
};

export default UseReplace;
