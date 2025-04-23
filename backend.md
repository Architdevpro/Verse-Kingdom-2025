
# Backend for Study Point Group

This is the backend for the Study Point Group website, built using Node.js, Express, and JSON file storage. The backend handles the following functionalities:

## Routes

### 1. `GET /messages`
- **Description**: Fetch all the messages stored in the `messages.json` file.
- **Response**: Returns a JSON array of all stored messages.

#### Example:
```json
[
  {
    "username": "John",
    "message": "Hello everyone!",
    "timestamp": "2025-04-23T12:00:00Z"
  }
]
```

### 2. `POST /messages`
- **Description**: Add a new message to the `messages.json` file.
- **Request Body**: A JSON object containing the message details.
  - `username`: The name of the user sending the message.
  - `message`: The content of the message.
  - `timestamp`: The time when the message was sent.

#### Example Request Body:
```json
{
  "username": "Jane",
  "message": "This is a new message!",
  "timestamp": "2025-04-23T12:30:00Z"
}
```

- **Response**: Returns the newly added message.

#### Example Response:
```json
{
  "username": "Jane",
  "message": "This is a new message!",
  "timestamp": "2025-04-23T12:30:00Z"
}
```

## Dependencies

- **express**: Web framework for Node.js.
- **cors**: Package for enabling Cross-Origin Resource Sharing (CORS).
- **fs**: File system module used for reading and writing the `messages.json` file.

## How to Run

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/study-point.git
```

2. **Install dependencies**:
```bash
cd study-point/backend
npm install
```

3. **Start the server**:
```bash
npm start
```

The server will run on `http://localhost:3000`. You can test the routes using Postman or any other API testing tool.

## Example Usage

1. **Fetching messages**: Send a GET request to `http://localhost:3000/messages`.
2. **Posting a message**: Send a POST request to `http://localhost:3000/messages` with a JSON body as shown above.

---

### File Structure

- `backend/server.js`: Main server file that handles the API routes.
- `backend/messages.json`: Stores all the chat messages.
- `backend/package.json`: Contains dependencies and startup script for the backend server.