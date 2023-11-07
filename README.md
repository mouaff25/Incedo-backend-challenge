# Incedo Backend Challenge - Node.js Artist Search & CSV Export

🎵 Welcome to the Incedo Backend Challenge repository! This Node.js application is designed to search for artists by name, retrieve artist information, and export the results to a CSV file. If no search results are found, it will fall back to retrieving random artist names from a JSON dictionary source.

## Features

- Search for artists by name.
- Export artist information to a CSV file.
- Retrieve random artist names from a JSON dictionary source if no search results are found.
- Well-structured Node.js application.
- Open source with the MIT License.

## Prerequisites

Before getting started, make sure you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/mouaff25/Incedo-backend-challenge.git
```

2. Navigate to the project directory:

```bash
cd Incedo-backend-challenge
```

3. Install the required dependencies:

```bash
npm install
```

## Usage

### Preparation

Before using the application you will need to obtain a [Last.fm API key](https://www.last.fm/api/account/create) and add it to the `.env` file in the project root directory.

```bash
LASTFM_API_KEY=your_api_key
```

You can also change the logging level (defaults to `info`) and the port number (defaults to `5000`) in the `.env` file.

```bash
LOG_LEVEL=info
PORT=3000
```
If you are instead running the application in a production environment, you can set the `NODE_ENV` environment variable to `production` and enter the API key, logging level, and port number directly as environment variables instead of using the `.env` file.

### Running the Application

To run the application, use the following command:

```bash
npm start
```

The application will be available at `http://localhost:5000` by default. You can change the port number in the `.env` file or by setting the `PORT` environment variable.

### Searching for Artists

To search for artists, send a `POST` request to the `/api/v1/artists` endpoint with the following JSON payload:

```json
{
  "name": "artist name",
  "csvFilename": "filename"
}
```

The `name` field is required and must be a string. The `csvFilename` field is optional and must be a string.

- If the `csvFilename` field is provided, the results will be exported to a CSV file with the specified name and the full result for the artist will be returned as a JSON object.
- If the `csvFilename` field is not provided, the results will be returned as a JSON object.

**Note:** If no search results are found, the application will fall back to retrieving random artist names from a JSON dictionary source.

### Downloading the CSV File

If you provided a `csvFilename` field in the request payload, the results will be exported to a CSV file with the specified name. The CSV file will be available for download at `http://localhost:5000/download/filename.csv` by default. (You can change the port number in the `.env` file or by setting the `PORT` environment variable.)

### Logging

The application uses [Winston](https://github.com/winstonjs/winston) for logging. The default logging level is `info`, but you can change it in the `.env` file or by setting the `LOG_LEVEL` environment variable.

The application logs to the console and to a file in the `logs` directory. The log file is named `app.log` and contains all logs. If the application is running in a production environment, the application only logs to the file.

### Health Check

To check the health of the application, send a `GET` request to the `/health` endpoint. The application will return a `200 OK` response if it is healthy.

## Testing

To run the tests, use the following command:

```bash
npm test
```

## License

This project is open source and available under the [MIT License](./LICENSE).

