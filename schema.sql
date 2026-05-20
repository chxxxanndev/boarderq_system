-- 1. ROOMS
CREATE TABLE rooms (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  monthly_rate  DECIMAL(10, 2) NOT NULL,
  amenities     TEXT,
  house_rules   TEXT,
  image_url     VARCHAR(500) DEFAULT NULL,
  location      VARCHAR(255) DEFAULT NULL,
  capacity      INT NOT NULL DEFAULT 1, 
  status        ENUM('available', 'maintenance') NOT NULL DEFAULT 'available',
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  role          ENUM('admin', 'tenant') NOT NULL DEFAULT 'tenant',
  push_token    VARCHAR(255) DEFAULT NULL,
  status        ENUM('pending', 'active', 'suspended') NOT NULL DEFAULT 'pending',
  avatar_url    VARCHAR(500) NULL,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ROOM TENANTS 
CREATE TABLE room_tenants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  user_id INT NOT NULL,
  move_in_date DATE,
  move_out_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. APPLICATIONS
CREATE TABLE applications (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  room_id         INT NOT NULL,
  user_id         INT DEFAULT NULL,
  applicant_name  VARCHAR(100) NOT NULL,
  applicant_email VARCHAR(150) NOT NULL,
  applicant_phone VARCHAR(20),
  message         TEXT,
  status          ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  applied_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at     TIMESTAMP NULL DEFAULT NULL,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. PAYMENTS
CREATE TABLE payments (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id        INT NOT NULL,
  room_id          INT NOT NULL,
  amount           DECIMAL(10, 2) NOT NULL,
  method           ENUM('gcash', 'cash') NOT NULL,
  status           ENUM('pending', 'confirmed', 'flagged') NOT NULL DEFAULT 'pending',
  reference_number VARCHAR(100) DEFAULT NULL,
  proof_url        VARCHAR(500) DEFAULT NULL,
  verified_by      INT DEFAULT NULL,
  verified_at      TIMESTAMP NULL,
  due_date         DATE NOT NULL,
  paid_date        DATE DEFAULT NULL,
  month_covered    DATE NOT NULL,
  notes            TEXT,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. MAINTENANCE REQUESTS
CREATE TABLE maintenance_requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id   INT NOT NULL,
  room_id     INT NOT NULL,
  title       VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  photo_url   VARCHAR(500) DEFAULT NULL,
  status      ENUM('pending', 'received', 'in_progress', 'resolved') NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- 7. ANNOUNCEMENTS
CREATE TABLE announcements (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  created_by  INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  body        TEXT NOT NULL,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);