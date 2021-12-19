import toast from "../helpers/toast";
import useGlobal from "./useGlobal";

function useRequests() {
  const { token } = useGlobal();

  async function get() {
    const bearerToken = `Bearer ${token}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.messageError(data);
        throw new Error(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function post(body, patch) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${patch}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.messageError(data);
        throw new Error(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function del(patch) {
    const bearerToken = `Bearer ${token}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${patch}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.messageError(data);
        throw new Error(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function put(body, patch) {
    const bearerToken = `Bearer ${token}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${patch}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearerToken,
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.messageError(data);
        throw new Error(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    get,
    post,
    del,
    put,
  };
}

export default useRequests;
