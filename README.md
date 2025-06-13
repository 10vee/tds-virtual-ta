# TDS Virtual TA

A Virtual Teaching Assistant for the Tools in Data Science (TDS) course at IIT Madras. This API automatically answers student questions based on course content and Discourse forum discussions.

## Features

- **REST API**: Accepts POST requests with student questions
- **Image Processing**: Handles base64-encoded image attachments
- **Knowledge Base**: Trained on TDS course content and Discourse posts
- **Smart Responses**: Returns contextual answers with relevant links
- **Production Ready**: CORS enabled, error handling, health checks

## API Usage

### Endpoint

```
POST /api/
```

### Request Format

```json
{
  "question": "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?",
  "image": "base64_encoded_image_data_optional"
}
```

### Response Format

```json
{
  "answer": "You must use `gpt-3.5-turbo-0125`, even if the AI Proxy only supports `gpt-4o-mini`. Use the OpenAI API directly for this question.",
  "links": [
    {
      "url": "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/4",
      "text": "Use the model that's mentioned in the question."
    }
  ]
}
```

### Example Usage

```bash
curl "https://your-deployed-app.com/api/" \
  -H "Content-Type: application/json" \
  -d '{"question": "Should I use Docker or Podman for this course?"}'
```

## Local Development

### Prerequisites

- Python 3.11+
- pip

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tds-virtual-ta.git
cd tds-virtual-ta
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
uvicorn main:app --reload
```

4. Access the API at `http://localhost:8000/api/`

## Deployment

### Render

1. Connect your GitHub repository to Render
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy and get your public URL

### Heroku

1. Install Heroku CLI
2. Login and create app:
```bash
heroku login
heroku create your-app-name
```

3. Deploy:
```bash
git push heroku main
```

## Testing

The application includes built-in responses for common TDS questions:

1. **GPT Model Selection**: Questions about gpt-3.5-turbo vs gpt-4o-mini
2. **Dashboard Scoring**: GA4 bonus point display (shows "110" for 10/10 + bonus)
3. **Container Tools**: Docker vs Podman recommendations
4. **Future Information**: Appropriate responses for unavailable information

### Health Check

```bash
curl https://your-deployed-app.com/api/health
```

## Project Structure

```
tds-virtual-ta/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── LICENSE             # MIT license
├── Procfile           # Heroku deployment config
├── runtime.txt        # Python version specification
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## Knowledge Base

The Virtual TA includes knowledge about:

- Course development tools (uv, git, bash, LLMs, SQLite)
- Container technologies (Docker, Podman)
- Assignment clarifications and scoring
- Common student questions from Discourse

## API Endpoints

- `GET /` - API information
- `POST /api/` - Submit questions
- `GET /api/health` - Health check

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions about the TDS course, visit:
- [TDS Course Website](https://tds.s-anand.net/)
- [Discourse Forum](https://discourse.onlinedegree.iitm.ac.in/)

## Deployment URLs

- **GitHub Repository**: https://github.com/yourusername/tds-virtual-ta
- **Live API**: https://your-deployed-app.com/api/

---

Built for the IIT Madras Tools in Data Science course project.
