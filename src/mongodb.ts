import { Entity, ObjectIdColumn, Column, DataSource } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;
}

const appDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 55000,
  username: 'docker',
  password: 'mongopw',
  database: 'book_database',
  authSource: 'admin',
  entities: [Book],
});

const main = async () => {
  await appDataSource.initialize();
};

main().catch(error => {
  console.log('Connection error:', error);
  process.exit(1);
}).then(()=>{
  console.log('Connected to MongoDB database');
  let bookRepo = appDataSource.getRepository(Book);

  bookRepo.find().then((book)=>{
     console.log(book,'[MongoDB]')
  })
});
