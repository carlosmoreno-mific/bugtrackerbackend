
IF NOT EXISTS(SELECT *
FROM sys.databases
WHERE name = 'BugTracker')
  BEGIN
    CREATE DATABASE BugTracker
END
GO


USE BugTracker
GO

IF NOT EXISTS (SELECT
    *
FROM
    sys.schemas
WHERE name = 'Security')
BEGIN
    EXEC('CREATE SCHEMA Security')
END
GO

IF NOT EXISTS (SELECT
    *
FROM
    sys.schemas
WHERE name = 'Task')
BEGIN
    EXEC('CREATE SCHEMA Task')
END
GO

-- Create a new table called 'Role' in schema 'Security'
-- Drop the table if it already exists
IF OBJECT_ID('Security.Role', 'U') IS NOT NULL
DROP TABLE Security.Role
GO

CREATE TABLE Security.Role
(
    RoleId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Description NVARCHAR(255)
);
GO

-- Create a new table called 'SystemUser' in schema 'Security'
-- Drop the table if it already exists
IF OBJECT_ID('Security.SystemUser', 'U') IS NOT NULL
DROP TABLE Security.SystemUser
GO
-- Create the table in the specified schema
CREATE TABLE Security.SystemUser
(
    SystemUserId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(60) NOT NULL,
    Lastname NVARCHAR(60) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Password NVARCHAR(MAX) NOT NULL
);
GO

-- Create a new table called 'Project' in schema 'Task'
-- Drop the table if it already exists
IF OBJECT_ID('Task.Project', 'U') IS NOT NULL
DROP TABLE Task.Project
GO
-- Create the table in the specified schema
CREATE TABLE Task.Project
(
    ProjectId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(60) NOT NULL,
    Description NVARCHAR(255)
);
GO

-- Create a new table called 'Team' in schema 'Task'
-- Drop the table if it already exists
IF OBJECT_ID('Task.Team', 'U') IS NOT NULL
DROP TABLE Task.Team
GO
-- Create the table in the specified schema
CREATE TABLE Task.Team
(
    ProjectId INT NOT NULL FOREIGN KEY REFERENCES Task.Project(ProjectId),
    SystemUserId INT NOT NULL FOREIGN KEY REFERENCES Security.SystemUser(SystemUserId),
    PRIMARY KEY(ProjectId, SystemUserId)
);
GO

-- Create a new table called 'Ticket' in schema 'Task'
-- Drop the table if it already exists
IF OBJECT_ID('Task.Ticket', 'U') IS NOT NULL
DROP TABLE Task.Ticket
GO
-- Create the table in the specified schema
CREATE TABLE Task.Ticket
(
    TicketId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    ProjectId INT NOT NULL FOREIGN KEY REFERENCES Task.Project(ProjectId),
    Title NVARCHAR(60) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Priority NVARCHAR(60) NOT NULL,
    Status NVARCHAR(60) NOT NULL,
    Type NVARCHAR(60) NOT NULL,
    CreatedAt DATETIME NOT NULL
);
GO

-- Create a new table called 'Comment' in schema 'Task'
-- Drop the table if it already exists
IF OBJECT_ID('Task.Comment', 'U') IS NOT NULL
DROP TABLE Task.Comment
GO
-- Create the table in the specified schema
CREATE TABLE Task.Comment
(
    CommentId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    TicketId INT NOT NULL FOREIGN KEY REFERENCES Task.Ticket(TicketId),
    Body NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    SystemUserId INT NOT NULL FOREIGN KEY REFERENCES Security.SystemUser(SystemUserId)
);
GO

-- Create a new table called 'Attachment' in schema 'Task'
-- Drop the table if it already exists
IF OBJECT_ID('Task.Attachment', 'U') IS NOT NULL
DROP TABLE Task.Attachment
GO
-- Create the table in the specified schema
CREATE TABLE Task.Attachment
(
    AttachmentId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    TicketId INT NOT NULL FOREIGN KEY REFERENCES Task.Ticket(TicketId),
    Url NVARCHAR(MAX) NOT NULL
);
GO