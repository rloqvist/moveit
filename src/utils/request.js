export const request = async ({ url, method = "GET", data, headers = new Headers() }) => {
  headers.append("Content-Type", "application/json");
  const body = !!data ? JSON.stringify(data) : null;
  const options = {
    headers,
    method,
    body,
    mode: "cors",
  };
  const response = await fetch(url, options);
  return await response.json();
};
