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
/****** Object:  StoredProcedure [dbo].[GetAllAppointment]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllAppointment]
AS
BEGIN
    SELECT app.AppointmentId,app.AppointmentDate,app.[Hours],app.[Mins],
	CASE WHEN app.[Status] = 0 THEN 'Pending'
		 WHEN app.[Status] = 1 THEN 'Approved'
		 ELSE 'Rejected' END AS [Status],
		 doc.[Name] as DoctorName,doc.Speciality,
		 pa.[Name] as PatientName,
		 pa.Age,
	CASE WHEN pa.[Gender] = 0 THEN 'Male'
		 ELSE 'Female' END AS Gender
	FROM Appointment app INNER JOIN Doctor doc
	ON app.DoctorId = doc.DoctorId
	 INNER JOIN Patient pa ON pa.PatientId = app.PatientId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllDoctorSchedule]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllDoctorSchedule]
    @DoctorId Int,
	@Status Int=0
AS
BEGIN
    SELECT sch.ScheduleId, Convert(varchar,sch.AppointmentDate,103) as AppointmentDate,CONVERT(VARCHAR(10), sch.[FromHours]) + ':'+CONVERT(VARCHAR(10), sch.[FromMins]) as [From],
	CONVERT(VARCHAR(10), sch.[ToHours]) + ':'+CONVERT(VARCHAR(10), sch.[ToMins]) as [To],
	CASE WHEN sch.[Status] = 0 THEN 'Active'
		 ELSE 'Inactive' END AS [Status],
		 doc.[Name] as DoctorName,doc.Speciality
		
	FROM DocotorScheduleAppointment sch INNER JOIN Doctor doc
	ON sch.DoctorId = doc.DoctorId
	WHERE doc.DoctorId = @DoctorId and [Status]=@Status
END
GO
/****** Object:  StoredProcedure [dbo].[GetAppointmentsByDoctor]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAppointmentsByDoctor]
    @DoctorId Int,
	@Status Int 
AS
BEGIN
    SELECT app.AppointmentId,Convert(varchar,app.AppointmentDate,103) as AppointmentDate,app.[Hours],app.[Mins],
	CASE WHEN app.[Status] = 0 THEN 'Pending'
		 WHEN app.[Status] = 1 THEN 'Approved'
		 ELSE 'Declined' END AS [Status],
		 doc.[Name] as DoctorName,doc.Speciality,
		 pa.[Name] as PatientName,
		 pa.Age,
	CASE WHEN pa.[Gender] = 0 THEN 'Male'
		 ELSE 'Female' END AS Gender
	FROM Appointment app INNER JOIN Doctor doc
	ON app.DoctorId = doc.DoctorId
	 INNER JOIN Patient pa ON pa.PatientId = app.PatientId
	WHERE doc.DoctorId = @DoctorId and app.[Status]=@Status
END
GO
/****** Object:  StoredProcedure [dbo].[GetAppointmentsByPatient]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAppointmentsByPatient]
    @PatientId Int,
	@Status Int
AS
BEGIN
    SELECT app.AppointmentId,Convert(varchar,app.AppointmentDate,103) as AppointmentDate,app.[Hours],app.[Mins],
	CASE WHEN app.[Status] = 0 THEN 'Pending'
		 WHEN app.[Status] = 1 THEN 'Approved'
		 ELSE 'Declined' END AS [Status],
		 doc.[Name] as DoctorName,doc.Speciality,
		 pa.[Name] as PatientName,
		 pa.Age,
	CASE WHEN pa.[Gender] = 0 THEN 'Male'
		 ELSE 'Female' END AS Gender
	FROM Appointment app INNER JOIN Doctor doc
	ON app.DoctorId = doc.DoctorId
	 INNER JOIN Patient pa ON pa.PatientId = app.PatientId
	WHERE pa.PatientId = @PatientId AND  [Status] = @Status
END
GO
/****** Object:  StoredProcedure [dbo].[GetDoctorSchedule]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetDoctorSchedule]
@ScheduleId int,
@DoctorId int

as
begin
select ScheduleId, Convert(varchar,AppointmentDate,103) as  [AppointmentDate] ,[FromHours] ,[FromMins] ,[ToHours] ,[ToMins] ,[Status] ,[DoctorId] 
from [DocotorScheduleAppointment] 
where ScheduleId=@ScheduleId and DoctorId=@DoctorId 
end
GO
/****** Object:  StoredProcedure [dbo].[GetUserDetails]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetUserDetails]
@User varchar(10),
@UserName varchar(255),
@Password varchar(255)

As 

Begin
IF(@User = '1')
begin
  select CONVERT(varchar(10), PatientId) as Id,[Name] from Patient where UserName=@UserName and [Password]=@Password
end
 else
  begin
  select CONVERT(varchar(10), DoctorId)  as Id,[Name] from Doctor where UserName=@UserName and [Password]=@Password
  end
ENd
GO
/****** Object:  StoredProcedure [dbo].[InsertAppointment]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertAppointment]
	@DoctorId INT,
    @PatientId INT,
	@Status INT,
	@Hr INT,
	@Min INT,
    @AppointmentDate DATETIME
AS
BEGIN
     INSERT INTO Appointment (AppointmentDate,[Hours],[Mins],[Status], DoctorId,PatientId)
	VALUES (@AppointmentDate,@Hr,@Min,@Status, @DoctorId, @PatientId)
END
GO
/****** Object:  StoredProcedure [dbo].[InsertDoctorScheduleAppointment]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[InsertDoctorScheduleAppointment]
	@DoctorId INT,
	@Status INT,
	@FromHr INT,
	@FromMin INT,
	@ToHr INT,
	@ToMin INT,
    @AppointmentDate DATETIME
AS
BEGIN
     INSERT INTO DocotorScheduleAppointment (AppointmentDate,[FromHours],[FromMins],[ToHours],[ToMins],[Status], DoctorId)
	VALUES (@AppointmentDate,@FromHr,@FromMin,@ToHr,@ToMin,@Status,@DoctorId)
END
GO
/****** Object:  StoredProcedure [dbo].[Registration]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Registration]
	@Name [varchar](255),
	@Age Int,
	@Gender Int,
	@State varchar(50),
	@City varchar(50),
	@Address varchar(100),
	@Pin varchar(6),
	@Mobile varchar(10),
	@UserName varchar(255),
	@Password varchar(255)
    
AS
BEGIN
     INSERT INTO Patient([Name],Age,Gender,[State],City,[Address],Pin,Mobile,UserName,[Password])
	 VALUES (@Name,@Age,@Gender,@State,@City,@Address,@Pin,@Mobile,@UserName,@Password)
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateAppointmentByDoctor]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAppointmentByDoctor]
@AppointmentId int,
@DoctorId int,
@Status int
as
begin
Update [Appointment] set [Status] = @Status where [DoctorId]=@DoctorId and AppointmentId=@AppointmentId
end
GO
/****** Object:  StoredProcedure [dbo].[UpdateDoctorScheduleAppointment]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[UpdateDoctorScheduleAppointment]
    @ScheduleId INT,
	@DoctorId INT,
	@Status INT,
	@FromHr INT,
	@FromMin INT,
	@ToHr INT,
	@ToMin INT,
    @AppointmentDate DATETIME
AS
BEGIN
     Update DocotorScheduleAppointment set [AppointmentDate] = @AppointmentDate 
										,[FromHours] =@FromHr 
										,[FromMins]=@FromMin
										,[ToHours]=@ToHr
										,[ToMins]=@ToMin
										,[Status]=@Status
										where ScheduleId = @ScheduleId and DoctorId=@DoctorId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateDoctorScheduleStatus]    Script Date: 01-06-2025 00:16:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateDoctorScheduleStatus]
@ScheduleId int,
@DoctorId int,
@Status int
as
begin
Update DocotorScheduleAppointment set [Status] = @Status where [DoctorId]=@DoctorId and ScheduleId=@ScheduleId
end
GO
