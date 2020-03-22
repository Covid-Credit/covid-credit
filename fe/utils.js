import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

function getApiEndpoint() {
  const { publicRuntimeConfig } = getConfig();
  let baseURL = publicRuntimeConfig.BASE_URL;
  if (process.browser) {
    baseURL = `${window.location.protocol}//${window.location.host}`;
  }
  return `${baseURL}/api`;
}

export async function getApi(endpoint, context = undefined) {
  const fetchHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (context?.req?.headers?.cookie) {
    fetchHeaders["cookie"] = context.req.headers.cookie;
  }

  const fetchOptions = {
    method: "GET",
    headers: fetchHeaders,
    credentials: "include",
  };
  const response = await fetch(`${getApiEndpoint()}/${endpoint}`, fetchOptions);
  if (response.status !== 200) {
    // eslint-disable-next-line
    console.error(await response.text());
    throw new Error("Request failed");
  }

  const data = await response.json();
  return data;
}

export async function postApi(endpoint, body = {}, context = undefined) {
  const fetchHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (context?.req?.headers?.cookie) {
    fetchHeaders["cookie"] = context.req.headers.cookie;
  }

  const fetchOptions = {
    method: "POST",
    headers: fetchHeaders,
    credentials: "include",
    body: JSON.stringify(body),
  };
  const response = await fetch(`${getApiEndpoint()}/${endpoint}`, fetchOptions);
  if (response.status !== 200) {
    // eslint-disable-next-line
    console.error(await response.text());
    throw new Error("Request failed");
  }

  const data = await response.json();
  return data;
}
