# 📝 iNotebook API

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
</div>

<div align="center">
  <h3>🚀 Secure RESTful API for note-taking application with JWT authentication</h3>
  <p>A robust backend service powering the iNotebook application with user management and secure note operations</p>
</div>

## 🌟 Features

🔐 **Secure Authentication** - JWT-based user registration and login  
📝 **Note Management** - Full CRUD operations for notes  
🛡️ **Data Protection** - Password hashing and input validation  
🚀 **RESTful Design** - Clean, organized API endpoints  
📊 **MongoDB Integration** - Efficient data storage and retrieval  
⚡ **Express.js Framework** - Fast and minimalist web framework  
🔒 **Route Protection** - Middleware-based authentication  
📈 **Scalable Architecture** - Modular and maintainable codebase  

## 🎯 API Overview

<div align="center">
  
**Base URL:** `https://your-api-domain.com/api`

</div>

### 📋 Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `GET` | `/auth/getuser` | Get user details | ✅ |
| `GET` | `/notes` | Fetch all user notes | ✅ |
| `POST` | `/notes` | Create new note | ✅ |
| `PUT` | `/notes/:id` | Update existing note | ✅ |
| `DELETE` | `/notes/:id` | Delete note | ✅ |

## 🛠️ Tech Stack

<div align="center">

**Backend Framework**  
![Node.js](https://img.shields.io/badge/Node.js-v16+-43853D?style=flat-square&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-v4.18+-404D59?style=flat-square)

**Database**  
![MongoDB](https://img.shields.io/badge/MongoDB-v5.0+-4EA94B?style=flat-square&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-v6.0+-red?style=flat-square)

**Authentication & Security**  
![JWT](https://img.shields.io/badge/JsonWebToken-v8.5+-black?style=flat-square&logo=JSON%20web%20tokens)
![bcryptjs](https://img.shields.io/badge/bcryptjs-v2.4+-blue?style=flat-square)

**Validation & Middleware**  
![express-validator](https://img.shields.io/badge/express--validator-v6.14+-orange?style=flat-square)
![CORS](https://img.shields.io/badge/CORS-enabled-green?style=flat-square)

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaquibAnjum/Inotebook-api.git
   cd Inotebook-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   **Configure your .env file:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/inotebook
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or ensure MongoDB Atlas connection is configured
   ```

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify installation**
   ```bash
   curl http://localhost:5000/api/auth/test
   # Should return: {"message": "API is running!"}
   ```

## 📁 Project Structure

```
Inotebook-api/
├── 📄 server.js              # Application entry point
├── 📁 models/                # Database schemas
│   ├── User.js               # User model
│   └── Note.js               # Note model
├── 📁 routes/                # API routes
│   ├── auth.js               # Authentication routes
│   └── notes.js              # Notes CRUD routes
├── 📁 middleware/            # Custom middleware
│   └── fetchuser.js          # JWT verification middleware
├── 📁 config/                # Configuration files
│   └── database.js           # MongoDB connection
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env.example           # Environment variables template
└── 📖 README.md              # Project documentation
```

## 🔍 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Notes Endpoints

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <jwt_token>
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My New Note",
  "description": "This is the content of my note",
  "tag": "personal"
}
```

#### Update Note
```http
PUT /api/notes/:noteId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Note Title",
  "description": "Updated content",
  "tag": "work"
}
```

#### Delete Note
```http
DELETE /api/notes/:noteId
Authorization: Bearer <jwt_token>
```

## 🔒 Security Features

### Password Security
- **bcryptjs hashing** with salt rounds
- **Minimum password requirements** enforced
- **No plain text storage** of passwords

### JWT Authentication
```javascript
// Token generation
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  expiresIn: '24h'
});

// Token verification middleware
const fetchuser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // Verification logic...
};
```

### Input Validation
```javascript
// Using express-validator
[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 })
]
```

## 🧪 Testing

### Manual Testing with cURL
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get notes (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Import the API collection (if available)
2. Set up environment variables for base URL and tokens
3. Test all endpoints with various scenarios

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, min: 3),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Note Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  title: String (required),
  description: String (required),
  tag: String (default: 'General'),
  createdAt: Date (default: Date.now),
  updatedAt: Date
}
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inotebook
JWT_SECRET=your_super_secure_secret_key_here
CORS_ORIGIN=https://your-frontend-domain.com
```

### Deployment Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Vercel**: Serverless deployment
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment

### Example Heroku Deployment
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow RESTful API conventions
- Write meaningful commit messages
- Add proper error handling
- Include input validation
- Update documentation for new features

## 📋 Todo / Roadmap

- [ ] 🔍 Advanced search functionality for notes
- [ ] 🏷️ Advanced tagging system with categories
- [ ] 📁 Folder/collection organization
- [ ] 🔗 Note sharing capabilities
- [ ] 📎 File attachment support
- [ ] 🔔 Push notifications
- [ ] 📊 Analytics and usage statistics
- [ ] 🌐 Multi-language support
- [ ] 📱 Rate limiting and throttling
- [ ] 🧪 Comprehensive test suite

## 📞 Support & Contact

**Saquib Anjum** - [@SaquibAnjum](https://github.com/SaquibAnjum)

- 📧 **Email**: your.email@example.com
- 💼 **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/saquibanjum)
- 🐛 **Issues**: [Report Bug](https://github.com/SaquibAnjum/Inotebook-api/issues)
- 💡 **Feature Requests**: [Request Feature](https://github.com/SaquibAnjum/Inotebook-api/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>⭐ If you found this project helpful, please give it a star!</strong></p>
  <p>🚀 <strong>Happy Coding!</strong> 🚀</p>
</div>
