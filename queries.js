const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log('=== TASK 2: Basic CRUD Operations ===\n');

    console.log('1. Find all books in Fiction genre:');
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    console.log(fictionBooks);
    console.log('\n');

    console.log('2. Find books published after 1950:');
    const recentBooks = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    console.log(recentBooks);
    console.log('\n');

    console.log('3. Find books by George Orwell:');
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    console.log(orwellBooks);
    console.log('\n');

    console.log('4. Update price of "1984" to $13.99:');
    const updateResult = await collection.updateOne(
      { title: '1984' },
      { $set: { price: 13.99 } }
    );
    console.log(`Modified ${updateResult.modifiedCount} document(s)`);
    const updatedBook = await collection.findOne({ title: '1984' });
    console.log(`New price: $${updatedBook.price}\n`);

    console.log('5. Delete "Animal Farm":');
    const deleteResult = await collection.deleteOne({ title: 'Animal Farm' });
    console.log(`Deleted ${deleteResult.deletedCount} document(s)\n`);

    console.log('=== TASK 3: Advanced Queries ===\n');

    console.log('1. Books in stock AND published after 2010:');
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log(inStockRecent);
    console.log('\n');

    console.log('2. Books with only title, author, and price (projection):');
    const projectedBooks = await collection.find(
      {},
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log(projectedBooks);
    console.log('\n');

    console.log('3a. Books sorted by price (ascending):');
    const sortedAsc = await collection.find({}).sort({ price: 1 }).toArray();
    console.log(sortedAsc.map(b => `${b.title} - $${b.price}`));
    console.log('\n');

    console.log('3b. Books sorted by price (descending):');
    const sortedDesc = await collection.find({}).sort({ price: -1 }).toArray();
    console.log(sortedDesc.map(b => `${b.title} - $${b.price}`));
    console.log('\n');

    console.log('4. Pagination - Page 1 (5 books per page):');
    const page1 = await collection.find({}).limit(5).skip(0).toArray();
    console.log(page1.map(b => b.title));
    console.log('\n');

    console.log('Pagination - Page 2:');
    const page2 = await collection.find({}).limit(5).skip(5).toArray();
    console.log(page2.map(b => b.title));
    console.log('\n');

    console.log('=== TASK 4: Aggregation Pipeline ===\n');

    console.log('1. Average price by genre:');
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: '$genre',
          averagePrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      },
      { $sort: { averagePrice: -1 } }
    ]).toArray();
    console.log(avgPriceByGenre);
    console.log('\n');

    console.log('2. Author with the most books:');
    const topAuthor = await collection.aggregate([
      {
        $group: {
          _id: '$author',
          bookCount: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log(topAuthor);
    console.log('\n');

    console.log('3. Books grouped by publication decade:');
    const booksByDecade = await collection.aggregate([
      {
        $addFields: {
          decade: {
            $multiply: [
              { $floor: { $divide: ['$published_year', 10] } },
              10
            ]
          }
        }
      },
      {
        $group: {
          _id: '$decade',
          count: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log(booksByDecade);
    console.log('\n');

    console.log('=== TASK 5: Indexing ===\n');

    console.log('1. Creating index on title field...');
    await collection.createIndex({ title: 1 });
    console.log('Index created on title\n');

    console.log('2. Creating compound index on author and published_year...');
    await collection.createIndex({ author: 1, published_year: -1 });
    console.log('Compound index created\n');

    console.log('3. Performance comparison - Query WITHOUT index optimization:');
    const explainBefore = await collection.find({ pages: { $gt: 300 } }).explain('executionStats');
    console.log(`Execution time: ${explainBefore.executionStats.executionTimeMillis}ms`);
    console.log(`Documents examined: ${explainBefore.executionStats.totalDocsExamined}\n`);

    await collection.createIndex({ pages: 1 });

    console.log('Performance comparison - Query WITH index:');
    const explainAfter = await collection.find({ pages: { $gt: 300 } }).explain('executionStats');
    console.log(`Execution time: ${explainAfter.executionStats.executionTimeMillis}ms`);
    console.log(`Documents examined: ${explainAfter.executionStats.totalDocsExamined}\n`);

    console.log('All indexes on books collection:');
    const indexes = await collection.indexes();
    console.log(indexes);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

runQueries().catch(console.error);