import { useEffect, useState } from "react";


export default function useFetchUsers(fetchFn, initalvalue, dependency) {

  const [usersData, setUsersData] = useState(initalvalue);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const data = await fetchFn();
        setUsersData(data);
      } catch (error) {
        setError({ message: error.message });
      }
      setIsLoading(false);
    }
    fetchUsers();
  }, [dependency]);

  return {
    usersData,
    setUsersData,
    error,
    isLoading
  }
}
