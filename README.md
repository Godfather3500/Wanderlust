![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

# Wanderlust – Airbnb Clone with Maps & Reviews 🏠✈️

A full-stack web application for listing and discovering vacation rentals, built with Node.js, Express, and MongoDB. Think of it as an Airbnb clone where users can browse, list, and review vacation properties.

# Live Demo → https://wanderlust-7dxz.onrender.com/listings  

## 🌟 Features

### Core Functionality
- **Property Listings**: Browse vacation rentals with high-quality images
- **User Authentication**: Secure signup/login with Passport.js
- **Property Management**: Create, edit, and delete your own listings
- **Review System**: Rate and review properties (1-5 stars)
- **Interactive Maps**: View property locations with TomTom Maps integration
- **Search & Filter**: Find properties by location or category
- **Image Upload**: Upload property images via ImgBB integration

### Categories
Properties are organized into categories:
- 🏔️ Mountains
- 🏖️ Beach
- 🏙️ City
- 🏰 Castle
- 🏊 Pool
- ⛺ Camping
- 🚜 Farm
- 🛏️ Rooms
- ❄️ Arctic

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Local Strategy)
- **Templating**: EJS (Embedded JavaScript)
- **File Upload**: Multer
- **Image Storage**: ImgBB API
- **Maps**: TomTom Maps API
- **Styling**: Bootstrap 5, Custom CSS
- **Session Management**: Express Session with MongoDB Store

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- ImgBB API key
- TomTom Maps API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   ATLAS_DB=your_mongodb_connection_string
   SECRET=your_session_secret_key
   IMGBB_API_KEY=your_imgbb_api_key
   ```

4. **Initialize Sample Data** (Optional)
   ```bash
   node init/index.js
   ```

5. **Start the Application**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

6. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
wanderlust/
├── controllers/          # Route controllers
│   ├── listings.js      # Property listing logic
│   ├── review.js        # Review management
│   └── user.js          # User authentication
├── models/              # Database schemas
│   ├── listing.js       # Property model
│   ├── review.js        # Review model
│   └── user.js          # User model
├── routes/              # Express routes
│   ├── listings.js      # Property routes
│   ├── review.js        # Review routes
│   └── user.js          # Authentication routes
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── includes/        # Partial templates
│   ├── listings/        # Property views
│   └── users/           # User views
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   └── js/             # Client-side JavaScript
├── utils/               # Utility functions
├── init/                # Database initialization
├── middlewear.js        # Custom middleware
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # ImgBB upload configuration
└── app.js              # Main application file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `ATLAS_DB` | MongoDB connection string | Yes |
| `SECRET` | Session secret key | Yes |
| `IMGBB_API_KEY` | ImgBB API key for image uploads | Yes |

### API Keys Setup

1. **MongoDB Atlas**: Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **ImgBB**: Get API key from [ImgBB API](https://api.imgbb.com/)
3. **TomTom Maps**: Register at [TomTom Developer Portal](https://developer.tomtom.com/)

## 🚀 Usage

### For Property Owners
1. **Sign up** for a new account
2. **Log in** to your account
3. Click **"Airbnb your home"** to create a listing
4. Fill in property details, upload images, set pricing
5. **Manage your listings** - edit or delete as needed

### For Travelers
1. **Browse listings** on the homepage
2. **Filter by category** using the top navigation
3. **Search** for specific destinations
4. **View property details** including location on map
5. **Leave reviews** after your stay

### Key Features Usage

- **Search**: Use the search bar to find properties by location
- **Categories**: Filter properties using category icons
- **Maps**: View exact property locations with interactive maps
- **Reviews**: Rate properties from 1-5 stars with comments
- **Price Toggle**: View prices with/without taxes

## 🔒 Security Features

- **Input Validation**: Server-side validation using Joi schemas
- **Authentication**: Secure user authentication with Passport.js
- **Authorization**: Users can only modify their own listings/reviews
- **Session Management**: Secure session handling with MongoDB store
- **Error Handling**: Comprehensive error handling and user feedback

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Interface**: Clean, Airbnb-inspired design
- **Interactive Elements**: Hover effects, smooth transitions
- **Flash Messages**: User feedback for actions (success/error)
- **Form Validation**: Real-time client-side validation

## 📱 API Endpoints

### Authentication
- `GET /signup` - User registration page
- `POST /signup` - Create new user account
- `GET /login` - Login page
- `POST /login` - User authentication
- `GET /logout` - User logout

### Listings
- `GET /listings` - Browse all properties
- `GET /listings/new` - Create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View property details
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Harpreet Singh |  linkedin : https://www.linkedin.com/in/harpreet-singh-3500am/

## 🙏 Acknowledgments

- Bootstrap for the responsive UI framework
- TomTom for mapping services
- ImgBB for image hosting
- Font Awesome for icons
- MongoDB Atlas for database hosting
