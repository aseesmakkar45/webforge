# Backend Schema & API Design

## 1. MongoDB Schemas (Mongoose)

### User Schema (`models/User.js`)
```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  createdAt: { type: Date, default: Date.now }
}
```

### [Placeholder] Generated Content Schema (`models/Content.js`)
```javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prompt: { type: String, required: true },
  aiResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

## 2. REST API Routes

### Authentication (`/api/auth`)
- `POST /register`: Accepts `{ username, email, password }`. Returns `{ token, user }`.
- `POST /login`: Accepts `{ email, password }`. Returns `{ token, user }`.

### User (`/api/user`)
- `GET /profile`: (Protected) Requires JWT. Returns `{ username, email, contentHistory }`.

### AI Generation (`/api/ai`)
- `POST /generate`: (Protected) Requires JWT. Accepts `{ prompt }`. Returns `{ generatedResult }`.
