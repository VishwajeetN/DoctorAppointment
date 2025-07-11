IF DB_ID('DoctorAppointment') IS NOT NULL
	BEGIN
		USE [DoctorAppointment]
	END
ELSE
	BEGIN
		CREATE DATABASE DoctorAppointment
	END
GO
USE [DoctorAppointment]
GO
ALTER TABLE [dbo].[DocotorScheduleAppointment] DROP CONSTRAINT [FK__DocotorSc__Docto__4222D4EF]
GO
ALTER TABLE [dbo].[Appointment] DROP CONSTRAINT [FK__Appointme__Patie__2A4B4B5E]
GO
ALTER TABLE [dbo].[Appointment] DROP CONSTRAINT [FK__Appointme__Docto__2B3F6F97]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 01-06-2025 00:14:09 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Patient]') AND type in (N'U'))
DROP TABLE [dbo].[Patient]
GO
/****** Object:  Table [dbo].[Doctor]    Script Date: 01-06-2025 00:14:09 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Doctor]') AND type in (N'U'))
DROP TABLE [dbo].[Doctor]
GO
/****** Object:  Table [dbo].[DocotorScheduleAppointment]    Script Date: 01-06-2025 00:14:09 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DocotorScheduleAppointment]') AND type in (N'U'))
DROP TABLE [dbo].[DocotorScheduleAppointment]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 01-06-2025 00:14:09 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Appointment]') AND type in (N'U'))
DROP TABLE [dbo].[Appointment]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 01-06-2025 00:14:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[AppointmentId] [int] IDENTITY(1,1) NOT NULL,
	[AppointmentDate] [datetime] NOT NULL,
	[Hours] [int] NOT NULL,
	[Mins] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[PatientId] [int] NULL,
	[DoctorId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[AppointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocotorScheduleAppointment]    Script Date: 01-06-2025 00:14:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocotorScheduleAppointment](
	[ScheduleId] [int] IDENTITY(1,1) NOT NULL,
	[AppointmentDate] [datetime] NOT NULL,
	[FromHours] [int] NOT NULL,
	[FromMins] [int] NOT NULL,
	[ToHours] [int] NOT NULL,
	[ToMins] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[DoctorId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ScheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Doctor]    Script Date: 01-06-2025 00:14:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctor](
	[DoctorId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Speciality] [varchar](50) NOT NULL,
	[UserName] [varchar](255) NULL,
	[Password] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[DoctorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 01-06-2025 00:14:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NOT NULL,
	[Age] [int] NOT NULL,
	[State] [varchar](50) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[Address] [varchar](100) NOT NULL,
	[Pin] [varchar](6) NOT NULL,
	[Mobile] [varchar](10) NOT NULL,
	[Gender] [int] NOT NULL,
	[UserName] [varchar](255) NULL,
	[Password] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Appointment] ON 

INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (1, CAST(N'2025-04-11T00:00:00.000' AS DateTime), 12, 15, 0, 1, 1)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (2, CAST(N'2025-05-18T00:00:00.000' AS DateTime), 11, 0, 1, 2, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (3, CAST(N'2025-06-01T10:30:00.000' AS DateTime), 10, 20, 1, 1, 1)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (4, CAST(N'2025-06-01T10:30:00.000' AS DateTime), 11, 20, 1, 1, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (5, CAST(N'2025-05-28T00:00:00.000' AS DateTime), 12, 30, 0, 16, 1)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (6, CAST(N'2025-05-29T00:00:00.000' AS DateTime), 13, 15, 1, 17, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (7, CAST(N'2025-05-30T00:00:00.000' AS DateTime), 10, 30, 1, 17, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (8, CAST(N'2025-06-01T00:00:00.000' AS DateTime), 12, 14, 0, 17, 1)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (9, CAST(N'2025-06-02T00:00:00.000' AS DateTime), 13, 0, 0, 17, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (10, CAST(N'2025-06-01T00:00:00.000' AS DateTime), 13, 30, 1, 18, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (11, CAST(N'2025-06-08T00:00:00.000' AS DateTime), 11, 30, 1, 21, 2)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (12, CAST(N'2025-08-06T00:00:00.000' AS DateTime), 11, 0, 1, 21, 3)
INSERT [dbo].[Appointment] ([AppointmentId], [AppointmentDate], [Hours], [Mins], [Status], [PatientId], [DoctorId]) VALUES (13, CAST(N'2025-08-06T00:00:00.000' AS DateTime), 11, 30, 1, 22, 3)
SET IDENTITY_INSERT [dbo].[Appointment] OFF
GO
SET IDENTITY_INSERT [dbo].[DocotorScheduleAppointment] ON 

INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (1, CAST(N'2025-05-30T10:30:00.000' AS DateTime), 10, 30, 13, 30, 0, 2)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (4, CAST(N'2025-05-30T00:00:00.000' AS DateTime), 9, 45, 10, 45, 1, 2)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (5, CAST(N'2025-06-01T00:00:00.000' AS DateTime), 12, 0, 14, 0, 0, 2)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (6, CAST(N'2025-06-02T00:00:00.000' AS DateTime), 13, 30, 15, 30, 0, 2)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (7, CAST(N'2025-06-03T00:00:00.000' AS DateTime), 17, 17, 18, 18, 0, 2)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (8, CAST(N'2025-06-08T00:00:00.000' AS DateTime), 10, 0, 12, 0, 0, 2)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (9, CAST(N'2025-08-06T00:00:00.000' AS DateTime), 10, 0, 12, 0, 0, 3)
INSERT [dbo].[DocotorScheduleAppointment] ([ScheduleId], [AppointmentDate], [FromHours], [FromMins], [ToHours], [ToMins], [Status], [DoctorId]) VALUES (10, CAST(N'2025-06-03T00:00:00.000' AS DateTime), 10, 0, 13, 0, 1, 3)
SET IDENTITY_INSERT [dbo].[DocotorScheduleAppointment] OFF
GO
SET IDENTITY_INSERT [dbo].[Doctor] ON 

INSERT [dbo].[Doctor] ([DoctorId], [Name], [Speciality], [UserName], [Password]) VALUES (1, N'Ajit Mane', N'Neurologist', N'Ajit', N'ajit123')
INSERT [dbo].[Doctor] ([DoctorId], [Name], [Speciality], [UserName], [Password]) VALUES (2, N'Vikrant Patil', N'Cardiologist', N'Vikrant', N'vikrant123')
INSERT [dbo].[Doctor] ([DoctorId], [Name], [Speciality], [UserName], [Password]) VALUES (3, N'Srisha Shahane', N'Orthopaedic', N'Srisha', N'srisha123')
SET IDENTITY_INSERT [dbo].[Doctor] OFF
GO
SET IDENTITY_INSERT [dbo].[Patient] ON 

INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (1, N'John Dsuza', 20, N'aaa', N'bbb', N'ccc', N'43567', N'9999999999', 0, N'John', N'john')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (2, N'Shina Deshmukh', 30, N'ddd', N'eee', N'fff', N'89768', N'8888888888', 1, N'Shina', N'shina')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (3, N'Smita Roy', 15, N'Bihar', N'Patna', N'Ram Niwas', N'345678', N'9845454567', 1, N'Smita', N'smita')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (4, N'Anita Jog', 23, N'Goa', N'Panji', N'Gokul Niwas', N'234567', N'7676767676', 1, N'Anita', N'anita')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (5, N'Mehul Rane', 27, N'Maharashtra', N'Sangali', N'Sangali Naka', N'909090', N'8989898989', 1, N'Mehul', N'mehul123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (6, N'Nisha Singh', 25, N'Uttar Pradesh', N'Kanpur', N'Anand Niwas', N'565656', N'9876543281', 1, N'Nisha', N'Nisha123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (7, N'Anand Sahu', 35, N'West Bengal', N'Calcutta', N'Chara cootage', N'234567', N'9786578904', 0, N'Anand', N'Anand123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (8, N'Kanika Sethi', 32, N'Gujrat', N'Rajko', N'Shastri Bunglow', N'444444', N'9876543234', 1, N'Kanika', N'kanika123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (9, N'Naman Ozha', 34, N'Karnataka', N'Bengaluru', N'Sai Apartment', N'897897', N'9098786789', 0, N'Naman', N'naman123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (10, N'qqq', 56, N'jhjkh', N'hhkj', N'hjkjh', N'878787', N'8987654323', 0, N'uuuu', N'uuuu789876')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (11, N'adf', 45, N'kkk', N'kkk', N'kkk', N'898989', N'8989898989', 0, N'uuuuuu', N'uuuuuuuuuu')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (12, N'Virat Kohli', 55, N'Delhi', N'Noida', N'Kanout Place', N'898989', N'8767676767', 0, N'Virat', N'virat123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (13, N'Chaitra Jadhav', 34, N'Maharashtra', N'Pune', N'Sudarshan Apartment', N'909090', N'9999999999', 1, N'Chaitra', N'chaitra')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (14, N'nnn', 67, N'jjjj', N'iii', N'kkk', N'989898', N'9999999999', 0, N'kkookkk', N'jjjjjjjjj')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (15, N'Test', 87, N'dsf', N'fasdf', N'sadf', N'787878', N'9898989898', 0, N'dfadf', N'fasdfaf')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (16, N'Meena Patel', 89, N'fsadf', N'asdfa', N'sdfaf', N'898989', N'9898989898', 1, N'fdsfsf', N'fadsfdsf')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (17, N'Harbhajan Singh', 40, N'Punjab', N'Amritsar', N'Guru Sahab Appartment', N'222222', N'7776665554', 0, N'Harbhajan', N'harbhajan123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (18, N'Gopal Das', 23, N'Bihar', N'Patna', N'Sankalp Niwas', N'678934', N'9090909090', 0, N'Gopal', N'gopal123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (19, N'fads', 23, N'dsfaf', N'dfa', N'dafa', N'678906', N'8888888888', 0, N'naaaa', N'afdsfjjjj')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (20, N'fads', 23, N'dsfaf', N'dfa', N'dafa', N'678906', N'8888888888', 0, N'naaaa', N'afdsfjjjj')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (21, N'Manish Malhotra', 35, N'Maharashtra', N'Pune', N'Kotharud, Panchashil Niwas', N'898989', N'9898989898', 0, N'Manish', N'manish123')
INSERT [dbo].[Patient] ([PatientId], [Name], [Age], [State], [City], [Address], [Pin], [Mobile], [Gender], [UserName], [Password]) VALUES (22, N'Dinesh Mane', 34, N'Maharashtra', N'Mumbai', N'Tilak Nagar, Thane', N'678909', N'8765432342', 0, N'Dinesh', N'dinesh123')
SET IDENTITY_INSERT [dbo].[Patient] OFF
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[DocotorScheduleAppointment]  WITH CHECK ADD FOREIGN KEY([DoctorId])
REFERENCES [dbo].[Doctor] ([DoctorId])
GO
