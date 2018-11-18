CREATE DATABASE dogs_db;

USE dogs_db;

CREATE TABLE dogs(
	id integer not null auto_increment primary key,
    dog_name varchar(100) not null,
    dog_image varchar(255)
);

INSERT INTO dogs (dog_name) VALUES ('“Dogs are not our whole life, but they make our lives whole.”
—Roger Caras 
');
INSERT INTO dogs (dog_name) VALUES ('“The better I get to know men, the more I find myself loving dogs.” – Charles De Gaulle');
INSERT INTO dogs (dog_name) VALUES ('"A dog is the only thing on earth that loves you more than he loves himself."– Josh Billings ');

SELECT * FROM dogs;


