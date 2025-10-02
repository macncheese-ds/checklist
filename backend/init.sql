create table chkl1(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Screen Printer (Yamaha)' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-001',
  operacion VARCHAR(250) DEFAULT 'OP#30-OP#130',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  op7 VARCHAR(250),
  op8 VARCHAR(250),
  op9 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl2(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Squeeguee Cleaner' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-002',
  operacion VARCHAR(250) DEFAULT 'Squeeguee Cleaner',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea VARCHAR(250) DEFAULT 'Lavado',
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl3(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Squeeguee Inspector' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-003',
  operacion VARCHAR(250) DEFAULT 'Squeeguee Inspector',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea VARCHAR(250) DEFAULT 'Lavado',
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl4(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Stencil Washer' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-004',
  operacion VARCHAR(250) DEFAULT 'Stencil Washer',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea VARCHAR(250) DEFAULT 'Lavado',
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  op7 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl5(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Smart Nozzle Cleaner' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-005',
  operacion VARCHAR(250) DEFAULT 'Smart Nozzle Cleaner',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea VARCHAR(250) DEFAULT 'Lavado',
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl6(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Smart Nozzle Cleaner' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-006',
  operacion VARCHAR(250) DEFAULT 'Smart Nozzle Cleaner',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea VARCHAR(250) DEFAULT 'Lavado',
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl7(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Reflow Oven (Heller)' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-007',
  operacion VARCHAR(250) DEFAULT 'OP#60-OP#160',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl8(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Loader Vacuum' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-008',
  operacion VARCHAR(250) DEFAULT 'OP#110A-OP#10',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl9(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Magazine Unloader' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-009',
  operacion VARCHAR(250) DEFAULT 'OP#90A-OP#190A',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl10(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Laser Marking' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-010',
  operacion VARCHAR(250) DEFAULT 'OP#20-OP#120',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl12(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Bottom Inspection' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-012',
  operacion VARCHAR(250) DEFAULT 'OP#185',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(20),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl13(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Arom System' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-013',
  operacion VARCHAR(250) DEFAULT 'OP#80-OP#180',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl14(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Post-Reflow AOI 3D (Kohyoung)' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-014',
  operacion VARCHAR(250) DEFAULT 'OP#70 - OP #170',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(20),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl15(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Reflow Oven (SMT)' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-015',
  operacion VARCHAR(20) DEFAULT 'OP#60 - OP #160',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl16(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Post-Reflow AOI 3D (Kohyoung)' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-015',
  operacion VARCHAR(250) DEFAULT 'OP#55 - OP #155',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(20),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl17(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'SMD Mounter' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-017',
  operacion VARCHAR(250) DEFAULT 'OP#50 - OP #150',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  op7 VARCHAR(250),
  op8 VARCHAR(250),
  op9 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl18(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT '3D SPI' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-018',
  operacion VARCHAR(250) DEFAULT 'OP#40 - OP #140',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl19(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'Screen Printer (DEK)' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-019',
  operacion VARCHAR(250) DEFAULT 'OP#30 - OP #130',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  op6 VARCHAR(250),
  op7 VARCHAR(250),
  op8 VARCHAR(250),
  op9 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);

create table chkl20(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(250) DEFAULT 'X-RAY' ,
  no_est VARCHAR(250) DEFAULT 'DC-SMT-020',
  operacion VARCHAR(250) DEFAULT 'OP#195',
  dep VARCHAR(250) DEFAULT 'SMT',
  linea ENUM('1','2','3','4'),
  turno VARCHAR(250),
  fr DATETIME NOT NULL,
  op1 VARCHAR(250),
  op2 VARCHAR(250),
  op3 VARCHAR(250),
  op4 VARCHAR(250),
  op5 VARCHAR(250),
  empleado VARCHAR(250),
  modelo VARCHAR(250),
  observaciones TEXT
);