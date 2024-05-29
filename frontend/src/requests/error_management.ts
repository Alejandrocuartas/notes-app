const errorManagement = (error: any) => {
    if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
    }

    if (error?.response?.data?.validation_errors) {
        throw new Error(error?.response?.data?.validation_errors[0].message);
    }

    throw new Error(error?.message);
}

export default errorManagement;
