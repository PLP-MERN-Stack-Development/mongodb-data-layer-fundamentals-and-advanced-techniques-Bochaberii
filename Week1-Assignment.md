# MongoDB Data Layer Fundamentals - Assignment

This project demonstrates MongoDB fundamentals including CRUD operations, advanced queries, aggregation pipelines, and indexing techniques.

---

## Prerequisites

Before running the scripts, ensure you have installed:

1. **MongoDB Community Edition**
   - Download: https://www.mongodb.com/try/download/community
   - Follow installation wizard (keep default settings)

2. **Node.js (version 18 or higher)**
   - Download: https://nodejs.org/
   - Choose LTS (Long Term Support) version

3. **MongoDB Compass** (Optional but recommended)
   - Download: https://www.mongodb.com/products/compass
   - Useful for viewing data visually

---

## Installation & Setup

### Step 1: Install Node.js Dependencies

Open Command Prompt or Terminal in the project folder and run:

```bash
npm install
```

This installs the MongoDB driver needed to connect to the database.

---

### Step 2: Start MongoDB Service

**Windows:**

Open Command Prompt as Administrator and run:
```bash
net start MongoDB
```

Or use Windows Services:
- Press `Win + R`
- Type `services.msc` and press Enter
- Find "MongoDB" in the list
- Right-click → Select "Start"

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

---

### Step 3: Verify MongoDB is Running

**Option 1: Using MongoDB Compass**
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- If connection succeeds, MongoDB is running ✅

**Option 2: Using Command Line**
```bash
mongosh
```
If you see the MongoDB shell prompt, it's working ✅

---

## Project Files

- `insert_books.js` - Populates the database with sample book data
- `queries.js` - Contains all assignment queries (Tasks 2-5)
- `package.json` - Project dependencies
- `README.md` - This file (instructions)

---

## Running the Scripts

### Script 1: Populate Database (Run First!)

This script creates the database and inserts 12 sample books.

```bash
node insert_books.js
```

**Expected Output:**
```
Connected to MongoDB server
Dropped existing collection to start fresh
12 books were successfully inserted into the database

Inserted books:
1. To Kill a Mockingbird by Harper Lee - $12.99
2. 1984 by George Orwell - $10.99
...
```

**What it creates:**
- Database: `plp_bookstore`
- Collection: `books`
- 12 book documents with fields: title, author, genre, published_year, price, in_stock, pages, publisher

---

### Script 2: Run All Queries (Run Second!)

This script executes all assignment tasks (CRUD, queries, aggregations, indexing).

```bash
node queries.js
```

**Expected Output:**

The script will display results organized by tasks:

```
Connected to MongoDB

=== TASK 2: Basic CRUD Operations ===

1. Find all books in Fiction genre:
[... list of fiction books ...]

2. Find books published after 1950:
[... list of books ...]

3. Find books by George Orwell:
[... list of books ...]

4. Update price of "1984" to $13.99:
Modified 1 document(s)
New price: $13.99

5. Delete "Animal Farm":
Deleted 1 document(s)

=== TASK 3: Advanced Queries ===
[... filtering, projection, sorting, pagination results ...]

=== TASK 4: Aggregation Pipeline ===
[... average prices, top authors, decade groupings ...]

=== TASK 5: Indexing ===
[... index creation and performance comparison ...]

Connection closed
```

---

## Viewing Data in MongoDB Compass

1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. Click on `plp_bookstore` database (left sidebar)
4. Click on `books` collection
5. You'll see all your book documents displayed visually

**Useful Compass Features:**
- **Documents tab**: View/edit/delete documents
- **Indexes tab**: See created indexes
- **Aggregations tab**: Build aggregation pipelines visually
- **Schema tab**: Analyze data structure
- **Explain Plan tab**: View query performance

---

## Assignment Tasks Completed

### Task 1: MongoDB Setup
- Created database `plp_bookstore`
- Created collection `books`
- Inserted 12 book documents

### Task 2: Basic CRUD Operations
1. Find books by genre (Fiction)
2. Find books published after 1950
3. Find books by author (George Orwell)
4. Update book price (1984 → $13.99)
5. Delete book by title (Animal Farm)

### Task 3: Advanced Queries
1. Combined filters (in_stock: true AND published_year > 2010)
2. Projection (show only title, author, price)
3. Sorting (by price ascending and descending)
4. Pagination (5 books per page)

### Task 4: Aggregation Pipeline
1. Calculate average price by genre
2. Find author with most books
3. Group books by publication decade (1800s, 1900s, etc.)

### Task 5: Indexing
1. Create single index on `title`
2. Create compound index on `author` and `published_year`
3. Use `explain()` to show performance improvement

---

## Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution:**
- Ensure MongoDB service is running
- Windows: Run `net start MongoDB` as Administrator
- Check if another application is using port 27017

### Problem: "Module not found" error
**Solution:**
```bash
npm install
```

### Problem: "Collection is empty" in MongoDB Compass
**Solution:**
```bash
node insert_books.js
```

### Problem: Scripts run but no visible output
**Solution:**
- Check terminal for error messages
- Verify MongoDB Compass shows data in `books` collection
- Ensure you're in the correct project directory

### Problem: "ECONNREFUSED" error
**Solution:**
- MongoDB service is not running
- Start it using instructions in Step 2 above

---

## Database Schema

Each book document has the following structure:

```json
{
  "title": "String",
  "author": "String",
  "genre": "String",
  "published_year": "Number",
  "price": "Number",
  "in_stock": "Boolean",
  "pages": "Number",
  "publisher": "String"
}
```

**Example:**
```json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "genre": "Fiction",
  "published_year": 1960,
  "price": 12.99,
  "in_stock": true,
  "pages": 336,
  "publisher": "J. B. Lippincott & Co."
}
```

---

## Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)
- [MongoDB Compass Guide](https://www.mongodb.com/docs/compass/current/)

---

## Screenshots for Submission

Take screenshots of:

1. **MongoDB Compass** - Main view showing `plp_bookstore` database and `books` collection
2. **Documents View** - All 12 books displayed
3. **Indexes Tab** - Showing created indexes
4. **Terminal Output** - Results from running `queries.js`
5. **Aggregation Results** - Average price by genre

---

## Submission Checklist

Before submitting, ensure your repository contains:

- [ ] `insert_books.js` (provided script)
- [ ] `queries.js` (your completed queries)
- [ ] `package.json` (dependencies file)
- [ ] `README.md` (this file)
- [ ] Screenshots folder with Compass/terminal images
- [ ] All files committed to GitHub

---

## Commands Quick Reference

| Action | Command |
|--------|---------|
| Install dependencies | `npm install` |
| Start MongoDB (Windows) | `net start MongoDB` |
| Populate database | `node insert_books.js` |
| Run all queries | `node queries.js` |
| Open MongoDB shell | `mongosh` |
| Check MongoDB status | Check MongoDB Compass connection |

---

## Author

  
Power Learn Project - MongoDB Fundamentals Assignment  
Week 1 - Data Layer Fundamentals

---

## Notes

- The `insert_books.js` script drops and recreates the collection each time to ensure clean data
- Running `queries.js` multiple times is safe - it won't duplicate data
- The "Animal Farm" book is deleted during Task 2, so subsequent runs won't find it
- Indexes persist in the database even after scripts finish

---

## Important

Make sure to run `insert_books.js` BEFORE running `queries.js`!

**Correct order:**
1. `node insert_books.js` ← Run first
2. `node queries.js` ← Run second

---

