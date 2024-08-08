
const URL = import.meta.env.VITE_BASE_URL;

export async function fetchUsers() {
    const response = await fetch(`${URL}/users`);
    if (!response.ok) {
        throw new Error("Failed to fetch users data!");
    }
    const result = await response.json();
    return result;
}

export async function editUserDetails(values, id) {
    const response = await fetch(`${URL}/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error("Failed to edit user details!");
    }
    const result = await response.json();
    return result;
}

export async function deleteUser(id) {
    const response = await fetch(`${URL}/users/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error("Failed to delete user!");
    }
    const result = await response.json();
    return result;
}

export async function fetchUserById(id) {
    const response = await fetch(`${URL}/users/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch users deatils!");
    }
    const result = await response.json();
    // console.log(result.user);
    const user = result.user;
    return user;
}