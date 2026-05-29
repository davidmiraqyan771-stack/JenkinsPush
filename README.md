# Node.js App for AWS Elastic Beanstalk

A minimal, production-ready Express.js app preconfigured for AWS Elastic Beanstalk.

## Project Structure

```
.
├── app.js          # Main server (entry point)
├── package.json    # Dependencies & start script
├── Procfile        # Optional EB process config
├── .gitignore
└── README.md
```

## Local Development

```bash
# Install dependencies
npm install

# Run with hot-reload (dev)
npm run dev

# Run normally
npm start
```

App runs at **http://localhost:8080**

## API Endpoints

| Method | Path       | Description                    |
|--------|------------|--------------------------------|
| GET    | `/`        | Health check (EB default ping) |
| GET    | `/health`  | Uptime & healthy status        |
| GET    | `/api/info`| Node.js runtime info           |

## Deploy to Elastic Beanstalk

### Option A — AWS EB CLI

```bash
# Install EB CLI (one-time)
pip install awsebcli

# Initialise (choose Node.js platform)
eb init

# Create environment & deploy
eb create my-env
eb deploy
```

### Option B — ZIP Upload (Console)

```bash
# Create a zip (exclude node_modules)
zip -r app.zip . -x "node_modules/*" ".git/*"
```

Then upload `app.zip` in the EB Console → **Upload and deploy**.

## Key EB Requirements Met ✅

- ✅ `npm start` script defined in `package.json`
- ✅ Listens on `process.env.PORT` (EB injects `8080`)
- ✅ `package.json` at project root
- ✅ Node.js version pinned via `engines` field
- ✅ `node_modules/` excluded from bundle
