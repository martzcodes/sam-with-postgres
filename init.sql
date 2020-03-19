CREATE TABLE hello_table (
  id serial NOT NULL PRIMARY KEY,
  hello_source varchar(20),
  hello_target varchar(20)
);

INSERT INTO hello_table (hello_source, hello_target)
  VALUES ('Matt', 'Whit');