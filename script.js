// User Database
const users = {
    student: {
        101: { name: "John Student", password: "123", course: "Computer Science", marks: 85 },
        102: { name: "Sarah Student", password: "123", course: "Electronics", marks: 92 }
    },
    teacher: {
        201: { name: "Dr. Smith", password: "123", subject: "Mathematics" },
        202: { name: "Prof. Johnson", password: "123", subject: "Physics" }
    },
    admin: {
        admin: { name: "Administrator", password: "admin" }
    }
};

// Current User
let currentUser = null;

// ========== LOGIN PAGE FUNCTIONS ==========
function showLogin(type) {
    // Hide all forms
    document.querySelectorAll('.login-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected form
    document.getElementById(type + '-login').style.display = 'block';
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

function login(type) {
    let id, password;
    
    if (type === 'student') {
        id = document.getElementById('studentId').value;
        password = document.getElementById('studentPass').value;
    } else if (type === 'teacher') {
        id = document.getElementById('teacherId').value;
        password = document.getElementById('teacherPass').value;
    } else {
        id = document.getElementById('adminUser').value;
        password = document.getElementById('adminPass').value;
    }
    
    // Check credentials
    if (users[type][id] && users[type][id].password === password) {
        currentUser = {
            type: type,
            id: id,
            name: users[type][id].name,
            ...users[type][id]
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid login! Try: Student ID:101 Pass:123');
    }
}

// ========== DASHBOARD FUNCTIONS ==========
function loadDashboard() {
    // Get user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = JSON.parse(savedUser);
    updateDashboard();
    updateTime();
    showSection('home');
    
    // Auto update time
    setInterval(updateTime, 1000);
}

function updateDashboard() {
    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRole').textContent = currentUser.type.toUpperCase();
    
    // Update icon based on user type
    const icon = document.getElementById('userIcon');
    if (currentUser.type === 'student') {
        icon.textContent = '👨‍🎓';
        document.getElementById('studentMenu').style.display = 'block';
    } else if (currentUser.type === 'teacher') {
        icon.textContent = '👨‍🏫';
        document.getElementById('teacherMenu').style.display = 'block';
    } else {
        icon.textContent = '👨‍💼';
        document.getElementById('adminMenu').style.display = 'block';
    }
}

function showSection(section) {
    const content = document.getElementById('content');
    
    switch(section) {
        case 'home':
            showHome(content);
            break;
        case 'profile':
            showProfile(content);
            break;
        case 'grades':
            showGrades(content);
            break;
        case 'attendance':
            showAttendance(content);
            break;
        case 'students':
            showStudents(content);
            break;
        case 'addGrades':
            showAddGrades(content);
            break;
        case 'manageStudents':
            showManageStudents(content);
            break;
        case 'manageTeachers':
            showManageTeachers(content);
            break;
    }
    
    // Update page title
    document.getElementById('pageTitle').textContent = 
        section.charAt(0).toUpperCase() + section.slice(1);
}

function showHome(content) {
    content.innerHTML = `
        <div class="welcome-box">
            <h2>Welcome, ${currentUser.name}!</h2>
            <p>College Management System</p>
            
            <div class="info-grid" style="margin-top: 30px;">
                <div class="info-item">
                    <h4>User Type</h4>
                    <p>${currentUser.type.toUpperCase()}</p>
                </div>
                
                ${currentUser.type === 'student' ? `
                    <div class="info-item">
                        <h4>Course</h4>
                        <p>${currentUser.course}</p>
                    </div>
                    <div class="info-item">
                        <h4>Marks</h4>
                        <p>${currentUser.marks}/100</p>
                    </div>
                ` : ''}
                
                ${currentUser.type === 'teacher' ? `
                    <div class="info-item">
                        <h4>Subject</h4>
                        <p>${currentUser.subject}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function showProfile(content) {
    content.innerHTML = `
        <div class="content-box">
            <h3>My Profile</h3>
            <div class="info-grid">
                <div class="info-item">
                    <h4>Name</h4>
                    <p>${currentUser.name}</p>
                </div>
                <div class="info-item">
                    <h4>ID</h4>
                    <p>${currentUser.id}</p>
                </div>
                
                ${currentUser.type === 'student' ? `
                    <div class="info-item">
                        <h4>Course</h4>
                        <p>${currentUser.course}</p>
                    </div>
                    <div class="info-item">
                        <h4>Marks</h4>
                        <p>${currentUser.marks}/100</p>
                    </div>
                ` : ''}
                
                ${currentUser.type === 'teacher' ? `
                    <div class="info-item">
                        <h4>Subject</h4>
                        <p>${currentUser.subject}</p>
                    </div>
                ` : ''}
            </div>
            
            <button class="btn" onclick="editProfile()">Edit Profile</button>
        </div>
    `;
}

function showGrades(content) {
    const grades = [
        { subject: "Mathematics", marks: 85, grade: "A" },
        { subject: "Physics", marks: 78, grade: "B+" },
        { subject: "Chemistry", marks: 92, grade: "A+" },
        { subject: "English", marks: 88, grade: "A" }
    ];
    
    let tableRows = '';
    grades.forEach(g => {
        tableRows += `
            <tr>
                <td>${g.subject}</td>
                <td>${g.marks}</td>
                <td>${g.grade}</td>
            </tr>
        `;
    });
    
    content.innerHTML = `
        <div class="content-box">
            <h3>My Grades</h3>
            <table class="table">
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Grade</th>
                </tr>
                ${tableRows}
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f4fc; border-radius: 5px;">
                <strong>Total Average: 85.75%</strong>
                <p>GPA: 3.5/4.0</p>
            </div>
        </div>
    `;
}

function showAttendance(content) {
    content.innerHTML = `
        <div class="content-box">
            <h3>Attendance Record</h3>
            <div class="info-grid">
                <div class="info-item">
                    <h4>Total Classes</h4>
                    <p>120</p>
                </div>
                <div class="info-item">
                    <h4>Present</h4>
                    <p>110</p>
                </div>
                <div class="info-item">
                    <h4>Absent</h4>
                    <p>10</p>
                </div>
                <div class="info-item">
                    <h4>Percentage</h4>
                    <p>91.67%</p>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4>Recent Classes:</h4>
                <ul style="margin-top: 10px;">
                    <li>✅ Mathematics - 15 Nov</li>
                    <li>✅ Physics - 14 Nov</li>
                    <li>❌ Chemistry - 13 Nov</li>
                    <li>✅ English - 12 Nov</li>
                </ul>
            </div>
        </div>
    `;
}

function showStudents(content) {
    const students = [
        { id: 101, name: "John", course: "CS", marks: 85 },
        { id: 102, name: "Sarah", course: "ECE", marks: 92 },
        { id: 103, name: "Mike", course: "ME", marks: 78 }
    ];
    
    let tableRows = '';
    students.forEach(s => {
        tableRows += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td>${s.marks}</td>
                <td>
                    <button class="btn" onclick="updateMarks(${s.id})">Update Marks</button>
                </td>
            </tr>
        `;
    });
    
    content.innerHTML = `
        <div class="content-box">
            <h3>Students List</h3>
            <table class="table">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Marks</th>
                    <th>Action</th>
                </tr>
                ${tableRows}
            </table>
        </div>
    `;
}

function showAddGrades(content) {
    content.innerHTML = `
        <div class="content-box">
            <h3>Add Student Grades</h3>
            <div style="margin-top: 20px;">
                <div class="form-group">
                    <input type="text" id="studentIdInput" placeholder="Student ID" style="width: 100%;">
                </div>
                <div class="form-group">
                    <input type="text" id="subjectInput" placeholder="Subject" style="width: 100%;">
                </div>
                <div class="form-group">
                    <input type="number" id="marksInput" placeholder="Marks (0-100)" style="width: 100%;">
                </div>
                <button class="btn" onclick="addGrade()" style="width: 100%;">Add Grade</button>
            </div>
        </div>
    `;
}

function showManageStudents(content) {
    content.innerHTML = `
        <div class="content-box">
            <h3>Manage Students</h3>
            <div style="margin-top: 20px;">
                <h4>Add New Student:</h4>
                <div class="form-group">
                    <input type="text" id="newStudentId" placeholder="Student ID">
                </div>
                <div class="form-group">
                    <input type="text" id="newStudentName" placeholder="Name">
                </div>
                <div class="form-group">
                    <input type="text" id="newStudentCourse" placeholder="Course">
                </div>
                <button class="btn" onclick="addStudent()">Add Student</button>
                <button class="btn" onclick="removeStudent()" style="background: #e74c3c;">Remove Student</button>
            </div>
        </div>
    `;
}

function showManageTeachers(content) {
    content.innerHTML = `
        <div class="content-box">
            <h3>Manage Teachers</h3>
            <div style="margin-top: 20px;">
                <h4>Add New Teacher:</h4>
                <div class="form-group">
                    <input type="text" id="newTeacherId" placeholder="Teacher ID">
                </div>
                <div class="form-group">
                    <input type="text" id="newTeacherName" placeholder="Name">
                </div>
                <div class="form-group">
                    <input type="text" id="newTeacherSubject" placeholder="Subject">
                </div>
                <button class="btn" onclick="addTeacher()">Add Teacher</button>
                <button class="btn" onclick="removeTeacher()" style="background: #e74c3c;">Remove Teacher</button>
            </div>
        </div>
    `;
}

function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString();
    
    if (document.getElementById('currentTime')) {
        document.getElementById('currentTime').textContent = `${dateStr} ${timeStr}`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Simple action functions
function editProfile() {
    const newName = prompt("Enter new name:", currentUser.name);
    if (newName) {
        alert("Profile updated! (Demo only - changes not saved)");
    }
}

function updateMarks(studentId) {
    const marks = prompt(`Enter new marks for student ${studentId}:`);
    if (marks) {
        alert(`Marks updated to ${marks} for student ${studentId}`);
    }
}

function addGrade() {
    const id = document.getElementById('studentIdInput').value;
    const subject = document.getElementById('subjectInput').value;
    const marks = document.getElementById('marksInput').value;
    
    if (id && subject && marks) {
        alert(`Grade added: Student ${id}, ${subject}: ${marks}/100`);
        // Clear inputs
        document.getElementById('studentIdInput').value = '';
        document.getElementById('subjectInput').value = '';
        document.getElementById('marksInput').value = '';
    } else {
        alert('Please fill all fields!');
    }
}

function addStudent() {
    const id = document.getElementById('newStudentId').value;
    const name = document.getElementById('newStudentName').value;
    const course = document.getElementById('newStudentCourse').value;
    
    if (id && name && course) {
        alert(`Student added: ${name} (ID: ${id}, Course: ${course})`);
        // Clear inputs
        document.getElementById('newStudentId').value = '';
        document.getElementById('newStudentName').value = '';
        document.getElementById('newStudentCourse').value = '';
    } else {
        alert('Please fill all fields!');
    }
}

function removeStudent() {
    const id = prompt("Enter Student ID to remove:");
    if (id) {
        alert(`Student ${id} removed successfully!`);
    }
}

function addTeacher() {
    const id = document.getElementById('newTeacherId').value;
    const name = document.getElementById('newTeacherName').value;
    const subject = document.getElementById('newTeacherSubject').value;
    
    if (id && name && subject) {
        alert(`Teacher added: ${name} (ID: ${id}, Subject: ${subject})`);
        // Clear inputs
        document.getElementById('newTeacherId').value = '';
        document.getElementById('newTeacherName').value = '';
        document.getElementById('newTeacherSubject').value = '';
    } else {
        alert('Please fill all fields!');
    }
}

function removeTeacher() {
    const id = prompt("Enter Teacher ID to remove:");
    if (id) {
        alert(`Teacher ${id} removed successfully!`);
    }
}

// Initialize dashboard if on dashboard page
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', loadDashboard);
}