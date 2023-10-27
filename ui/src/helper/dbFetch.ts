

// Define the types for data
interface SuccessResponse {
  success: boolean;
  data?: string; 
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

// Define the Fetch function
export async function Fetch(path: string, data: any): Promise<SuccessResponse | ErrorResponse> {
  try {
    const endpoint = "http://localhost:8000";
    const response = await fetch(endpoint.concat(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: 'follow',
      credentials: 'include',
      body: JSON.stringify(data),
    });

    console.log(response);

    const responseBody = await response.text();
    const result = JSON.parse(responseBody);
    return result;
  } catch (e) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}

// Define the Get function
export async function Get(query: string): Promise<SuccessResponse | ErrorResponse> {
  const endpoint = "http://localhost:8000";
  const response = await fetch(endpoint + query, {
    method: "GET",
    credentials: 'include', // Include cookies in the request
  });

  const responseBody = await response.text();
  try {
    const result = JSON.parse(responseBody);
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Error parsing JSON",
    };
  }
}

// Define the Delete function
export async function Delete(path: string): Promise<SuccessResponse | ErrorResponse> {
  try {
    const endpoint = "http://localhost:8000";
    const response = await fetch(endpoint.concat(path), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: 'include'
      },
    });
    const responseBody = await response.text();
    const result = JSON.parse(responseBody);
    return result
  } catch (e) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}

// Define the Update function
export async function Update(path: string, data: any): Promise<SuccessResponse | ErrorResponse> {
  try {
    const endpoint = "http://localhost:8000";
    const response = await fetch(endpoint.concat(path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseBody = await response.text();
    const result = JSON.parse(responseBody); 
      
     return result
    
  } catch (e) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
