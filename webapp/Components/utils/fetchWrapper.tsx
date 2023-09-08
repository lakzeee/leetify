const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function get(url: string) {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function handleResponse(response: Response) {
  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    data = text;
  }

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: typeof data === "string" ? data : response.statusText,
    };
    return { error };
  }
}

export const fetchWrapper = { get };
