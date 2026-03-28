export const mockRooms = [
  { id: 1, name: 'Premium Solo Room', location: '2nd Floor, Wing A', price: 5500, capacity: 1, status: 'Available', image: 'https://picsum.photos/seed/room1/400/300' },
  { id: 2, name: 'Shared Double Room', location: '1st Floor, Wing B', price: 3500, capacity: 2, status: 'Available', image: 'https://picsum.photos/seed/room2/400/300' },
  { id: 3, name: 'Executive Suite', location: '3rd Floor, Penthouse', price: 8000, capacity: 1, status: 'Occupied', image: 'https://picsum.photos/seed/room3/400/300' },
  { id: 4, name: 'Standard Solo', location: '2nd Floor, Wing B', price: 4500, capacity: 1, status: 'Available', image: 'https://picsum.photos/seed/room4/400/300' },
  { id: 5, name: 'Budget Shared', location: 'Ground Floor', price: 2500, capacity: 4, status: 'Available', image: 'https://picsum.photos/seed/room5/400/300' },
  { id: 6, name: 'Loft Type Room', location: '3rd Floor, Wing A', price: 6500, capacity: 2, status: 'Occupied', image: 'https://picsum.photos/seed/room6/400/300' },
];

export const mockApplications = [
  { id: 1, name: 'John Doe', email: 'john@example.com', occupation: 'Student', roomNumber: '101', date: '2026-03-25' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', occupation: 'Software Engineer', roomNumber: '204', date: '2026-03-26' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', occupation: 'Lawyer', roomNumber: '305', date: '2026-03-27' },
];

export const mockPayments = [
  { id: 1, tenantName: 'Alice Johnson', amount: 5500, month: 'March', dueDate: '2026-03-05', status: 'Paid' },
  { id: 2, tenantName: 'Bob Wilson', amount: 3500, month: 'March', dueDate: '2026-03-05', status: 'Pending' },
  { id: 3, tenantName: 'Charlie Brown', amount: 4500, month: 'March', dueDate: '2026-03-05', status: 'Paid' },
];

export const mockMaintenance = [
  { id: 1, title: 'Leaking Faucet', roomNumber: '202', tenantName: 'Alice Johnson', description: 'The faucet in the bathroom is dripping constantly.', status: 'Pending', date: '2026-03-27' },
  { id: 2, title: 'AC Not Cooling', roomNumber: '105', tenantName: 'Bob Wilson', description: 'The air conditioner is running but not blowing cold air.', status: 'In Progress', date: '2026-03-26' },
  { id: 3, title: 'Busted Light Bulb', roomNumber: '301', tenantName: 'Charlie Brown', description: 'Main light in the bedroom is flickering.', status: 'Completed', date: '2026-03-25' },
];

export const mockAnnouncements = [
  { id: 1, title: 'Monthly General Cleaning', content: 'Please be informed that there will be a general cleaning of common areas this Saturday.', date: '2026-03-28' },
  { id: 2, title: 'Water Interruption', content: 'Water supply will be temporarily cut off on Wednesday from 1PM to 5PM for maintenance.', date: '2026-03-25' },
];
