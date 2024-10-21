 Create database AnimalShelters

USE AnimalShelters;

-- Create Users table
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(250) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    PasswordHash VARBINARY(MAX),
    PasswordSalt VARBINARY(MAX),
    Image NVARCHAR(MAX),
    IsDeleted BIT DEFAULT 'false',
	Description nvarchar (MAX),
	UserAge int,
	UserAdderss NVARCHAR (MAX),
);

-- Create Category table
CREATE TABLE Category (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Species NVARCHAR(50) NOT NULL,  
    Image NVARCHAR(MAX)
);

-- Create Shelters table
CREATE TABLE Shelters (
    ShelterId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    Address NVARCHAR(500),
    Phone NVARCHAR(20),
    Email NVARCHAR(255) NOT NULL,
    Verified BIT DEFAULT 0,  -- 0 = Not Verified, 1 = Verified
    CreatedAt DATETIME DEFAULT GETDATE(),
);

-- Create Animals table
CREATE TABLE Animals (
    AnimalId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    categoryID BIGINT,  -- Foreign key to Category table
    Breed NVARCHAR(100),
    Age INT NOT NULL,
    ShelterId INT,  -- Foreign key to Shelters table
    Temperament NVARCHAR(255),
    AdoptionStatus NVARCHAR(50) DEFAULT 'Available', 
    ImageUrl NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_categoryAnimal FOREIGN KEY (categoryID) REFERENCES Category(id),
    CONSTRAINT fk_shelters FOREIGN KEY (ShelterId) REFERENCES Shelters(ShelterId)
);

-- Create AdoptionApplications table
CREATE TABLE AdoptionApplications (
    ApplicationId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,  -- Foreign key to Users table
    AnimalId INT,  -- Foreign key to Animals table
    Status NVARCHAR(50) DEFAULT 'Pending', 
    SubmittedAt DATETIME DEFAULT GETDATE(),
	Message NVARCHAR (MAX),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_AdoptionApplications_User FOREIGN KEY (UserId) REFERENCES Users(UserId),
    CONSTRAINT FK_AdoptionApplications_Animal FOREIGN KEY (AnimalId) REFERENCES Animals(AnimalId)
);

-- Create Posts table
CREATE TABLE Posts (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    userId INT,  -- Foreign key to Users table
    content TEXT,
    image NVARCHAR(MAX),
    title NVARCHAR(MAX),
    tag NVARCHAR(MAX),
    CONSTRAINT FK_Posts_User FOREIGN KEY (userId) REFERENCES Users(UserId)
);

-- Create Likes table
CREATE TABLE Likes (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    postId BIGINT,  -- Foreign key to Posts table
    userId INT,  -- Foreign key to Users table
    CONSTRAINT FK_Like_Post FOREIGN KEY (postId) REFERENCES Posts(id),
    CONSTRAINT FK_Like_User FOREIGN KEY (userId) REFERENCES Users(UserId)
);

-- Create Comments table
CREATE TABLE Comments (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    postId BIGINT,  -- Foreign key to Posts table
    userId INT,  -- Foreign key to Users table
    content TEXT,
    CONSTRAINT FK_Comments_Post FOREIGN KEY (postId) REFERENCES Posts(id),
    CONSTRAINT FK_Comments_User FOREIGN KEY (userId) REFERENCES Users(UserId)
);

-- Create Replies table
CREATE TABLE Replies (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    commentId BIGINT,  -- Foreign key to Comments table
    userId INT,  -- Foreign key to Users table
    content TEXT,
    CONSTRAINT FK_Replies_Comment FOREIGN KEY (commentId) REFERENCES Comments(id),
    CONSTRAINT FK_Replies_User FOREIGN KEY (userId) REFERENCES Users(UserId)
);

-- Create Admins table
CREATE TABLE Admins (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255),
    username NVARCHAR(255),
    email NVARCHAR(255),
    image NVARCHAR(MAX),
	Password NVARCHAR(MAX),
    passwordHash VARBINARY(MAX),
    passwordSalt VARBINARY(MAX),
    role NVARCHAR(50) CHECK (role IN ('Admin', 'Super Admin')) DEFAULT 'Admin',
    createdAt DATETIME DEFAULT GETDATE()
);

-- Create Contacts table
CREATE TABLE Contacts (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    message NVARCHAR(MAX) NOT NULL
);